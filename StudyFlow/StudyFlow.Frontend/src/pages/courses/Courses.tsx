import React from 'react';
import './courses.css';
import { useTheme } from '../../ThemeContext'; // Mantener el tema
import { coursesData } from './coursesData';
import { CourseCard } from '../../Components'; // Importamos el componente CourseCard

const Courses: React.FC = () => {
    const { theme } = useTheme(); // Usamos el tema de la aplicaci�n

    const handleBecomeInstructor = () => {
        alert("Formulario para convertirse en profesor pronto estar� disponible.");
    };

    return (
        <div className={`courses_page ${theme}`}>
            <div className="courses-container">
                <h1>Tus Cursos</h1>
                <p>A continuaci�n se muestran los cursos en los que est�s inscrito:</p>
                <div className="course-list">
                    {coursesData?.map((course) => (
                        <CourseCard
                            key={course.id}
                            name={course.name}
                            description={course.description}
                            professor={course.professor}
                        />
                    ))}
                </div>

                <button className="become-instructor-btn" onClick={handleBecomeInstructor}>
                    Quiero ser profesor
                </button>
            </div>
        </div>
    );
};

export default Courses;