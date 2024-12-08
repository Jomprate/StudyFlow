import React from 'react';
import './courses.css';
import { useTheme } from '../../ThemeContext';
import { coursesData } from './coursesData';
import { CourseCard } from '../../components';

const Courses: React.FC = () => {
    const { theme } = useTheme();

    const handleBecomeInstructor = () => {
        alert("Formulario para convertirse en profesor pronto estar� disponible.");
    };

    return (
        <div className={`courses_page ${theme}`}>
            <div className="courses-container">
                <h1>Tus Cursos</h1>
                <p>A continuaci�n se muestran los cursos en los que est�s inscrito:</p>
                <div className="course-list">
                    {coursesData.map((course) => (
                        <CourseCard
                            key={course.id.toString()}
                            name={course.name}
                            description={course.description}
                            teacher={course.professor}
                            image={course.image}
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