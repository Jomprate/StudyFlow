import './courses.css';
import { useTheme } from '../../ThemeContext';
import { coursesData } from './coursesData';
import { CourseCard } from '../../components';

const Courses: React.FC = () => {
    const { theme } = useTheme();

    const handleBecomeInstructor = () => {
        alert("Formulario para convertirse en profesor pronto estará disponible.");
    };

    return (
        <div className={`courses_page ${theme}`}>
            <div className="courses-container">
                <h1>Tus Cursos</h1>
                <p>A continuación se muestran los cursos en los que estás inscrito:</p>
                <div className="course-list">
                    {coursesData && coursesData.length > 0 ? (
                        coursesData.map((course) => (
                            course && (
                                <CourseCard
                                    key={course.id.toString()}
                                    name={course.name || "Curso sin nombre"}
                                    description={course.description || "Descripción no disponible"}
                                    teacher={course.professor || "Profesor no asignado"}
                                    image={course.image || ""}
                                />
                            )
                        ))
                    ) : (
                        <p>No hay cursos disponibles.</p>
                    )}
                </div>

                <button className="become-instructor-btn" onClick={handleBecomeInstructor}>
                    Quiero ser profesor
                </button>
            </div>
        </div>
    );
};

export default Courses;