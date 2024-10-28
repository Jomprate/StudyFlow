import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseByIdAsync, CourseDTO } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../ThemeContext';
import NavBarCourse from '@components/navBarCourse/NavBarCourse';
import Course_Announces from './Course_Announces/Course_Announces';
import Course_Classwork from './Course_ClassWork_/Course_Classwork';
import Course_People from './Course_People/Course_People';
import './course.css';

const Course_: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>(); // Ajuste aquí para usar `courseId`
    const { state } = useAuth();
    const { theme } = useTheme();
    const [course, setCourse] = useState<CourseDTO | null>(null);
    const [activeSection, setActiveSection] = useState<string>('announcements');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const teacherId = state.userName;

                console.log("Params from useParams:", { courseId });
                console.log("Sending request with:", {
                    courseId,
                    teacherId,
                });

                if (!courseId) {
                    console.error("CourseId is missing.");
                    return;
                }
                if (!teacherId) {
                    console.error("TeacherId is missing.");
                    return;
                }

                // Llamada a la API
                const courseData = await getCourseByIdAsync(courseId, teacherId);

                // Mostrar en consola la respuesta recibida
                console.log("API Response:", courseData);

                // Guardar el resultado en el estado
                setCourse(courseData);

                console.log("Course fetched:", courseData);
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };

        fetchCourse();
    }, [courseId, state.userName]);

    const renderSection = () => {
        switch (activeSection) {
            case 'announcements':
                return <Course_Announces />;
            case 'classwork':
                return <Course_Classwork />;
            case 'people':
                return <Course_People />;
            default:
                return <Course_Announces />;
        }
    };

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <div className={`course-page ${theme}`}>
            <NavBarCourse setActiveSection={setActiveSection} />
            <div className="course-container">
                <div className="course-header">
                    <h1>{course.data.name}</h1>
                    <h2>{course.data.description}</h2>
                </div>

                <div className="course-layout">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default Course_;