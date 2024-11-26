import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courseApi } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../ThemeContext';
import NavBarCourse from '@components/navBarCourse/NavBarCourse';
import Course_Announces from './Course_Announces/Course_Announces';
import Course_Classwork from './Course_ClassWork_/Course_Classwork';
import Course_People from './Course_People/Course_People';
import user_p from '../../assets/user_p.svg';
import './course.css';

interface CourseResponse {
    data: courseApi.CourseDTO;
}

const Course_: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const { state } = useAuth();
    const { theme } = useTheme();

    const [course, setCourse] = useState<CourseResponse | null>(null);
    const [activeSection, setActiveSection] = useState<string>('announcements');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const teacherId = state.userName;

                if (!courseId) {
                    console.error("CourseId is missing.");
                    return;
                }
                if (!teacherId) {
                    console.error("TeacherId is missing.");
                    return;
                }

                const courseData = await courseApi.getCourseByIdAsync(courseId, teacherId);

                console.log("Course fetched:", courseData);

                if (courseData && courseData.data) {
                    setCourse(courseData);
                } else {
                    console.error("Unexpected response structure:", courseData);
                }
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
                    <div className="course-header-text">
                        <h1>{course.data.name}</h1>
                        <h2>{course.data.description}</h2>
                    </div>
                    <img
                        src={course.data.logo ? `data:image/png;base64,${course.data.logo}` : user_p}
                        alt="Course Logo"
                        className="course-image"
                    />
                </div>
                <div className="course-layout">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default Course_;