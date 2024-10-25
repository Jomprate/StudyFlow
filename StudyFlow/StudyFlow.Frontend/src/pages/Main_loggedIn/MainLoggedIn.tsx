import React, { useState, useEffect } from 'react';
import './main_loggedIn.css';
import { useTheme } from '../../ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

interface Course {
    id: string;
    name: string;
    createdBy?: string;
    enrolled?: boolean;
}

interface Student {
    id: string;
    name: string;
}

const MainLoggedIn: React.FC = () => {
    const { theme } = useTheme();
    const [userCourses, setUserCourses] = useState<Course[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const { state } = useAuth();

    useEffect(() => {
        const userRole = state.role;
        const allCourses: Course[] = [
            { id: '1', name: 'Course 1', createdBy: 'teacherId', enrolled: true },
            { id: '2', name: 'Course 2', createdBy: 'teacherId', enrolled: false },
        ];
        const enrolledStudents: Student[] = [
            { id: '1', name: 'John Doe' },
            { id: '2', name: 'Jane Smith' }
        ];

        if (userRole === 'Teacher') {
            setUserCourses(allCourses.filter(course => course.createdBy === 'teacherId'));
            setStudents(enrolledStudents);
        } else {
            setUserCourses(allCourses.filter(course => course.enrolled));
        }
    }, [state.role]);

    return (
        <div className={`main_loggedIn_page ${theme}`}>
            <div className="main_loggedIn-header">
                <h1>Main</h1>
                <p>Here are your Information.</p>
            </div>

            <div className="main_loggedIn-columns">
                {/* Columna izquierda: Botón de crear curso y lista de cursos */}
                <div className="column-box">
                    <div className="main_loggedIn-left">
                        {state.role === 'Teacher' && (
                            <>
                                <button className="create-course-button">Create New Course</button>
                                <h2>Your Created Courses:</h2>
                                <ul className="course-list">
                                    {userCourses.map(course => (
                                        <li key={course.id} className="course-item">
                                            {course.name}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>

                {/* Columna derecha: Lista de estudiantes */}
                <div className="column-box">
                    <div className="main_loggedIn-right">
                        {state.role === 'Teacher' && (
                            <>
                                <h2>Enrolled Students:</h2>
                                <ul className="student-list">
                                    {students.map(student => (
                                        <li key={student.id} className="student-item">
                                            {student.name}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLoggedIn;