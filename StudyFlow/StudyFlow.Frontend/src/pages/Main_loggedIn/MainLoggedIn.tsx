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

const MainLoggedIn: React.FC = () => {
    const { theme } = useTheme();
    const [userCourses, setUserCourses] = useState<Course[]>([]);
    const { state } = useAuth();  // Obtenemos el rol desde el estado de autenticación

    useEffect(() => {
        const userRole = state.role;  // Acceso al rol directamente del estado

        // Aquí obtendrías los cursos internamente; esta es solo una muestra de datos
        const allCourses: Course[] = [
            { id: '1', name: 'Course 1', createdBy: 'teacherId', enrolled: true },
            { id: '2', name: 'Course 2', createdBy: 'teacherId', enrolled: false },
            // Agrega más cursos según sea necesario
        ];

        // Filtrar cursos según el rol
        const filteredCourses = userRole === 'Teacher'
            ? allCourses.filter(course => course.createdBy === 'teacherId')
            : allCourses.filter(course => course.enrolled);
        setUserCourses(filteredCourses);
    }, [state.role]);

    return (
        <div className={`main_loggedIn_page ${theme}`}>
            <div className="main_loggedIn-container">
                <h1>Main</h1>
                <p>Here are your Information.</p>

                {/* Mostrar el botón de creación solo si el rol es Teacher */}
                {state.role === 'Teacher' && (
                    <div className="top-right">
                        <button className="create-course-button">Create New Course</button>
                    </div>
                )}

                {/* Condicional para mostrar opciones según el rol */}
                {state.role === 'Teacher' ? (
                    <h2>Your Created Courses:</h2>
                ) : (
                    <h2>Your Enrolled Courses:</h2>
                )}

                <ul className="course-list">
                    {userCourses.map(course => (
                        <li key={course.id} className="course-item">
                            {course.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MainLoggedIn;