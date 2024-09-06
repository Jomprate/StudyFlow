import React from 'react';
import './courseCard.css';
import { useTheme } from '../../ThemeContext'; // Asegúrate de que el contexto está funcionando correctamente
import CurseImage from '../../assets/user_p.svg'; // Importación del SVG como imagen

interface CourseCardProps {
    name: string;
    description: string;
    professor: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, description, professor }) => {
    const { theme } = useTheme(); // Esto debería devolver 'light' o 'dark'

    return (
        <div className={`course-card ${theme}`}>
            <img src={CurseImage} alt={name} className="course-image" />
            <div className="course-details">
                <div className="course-title-container">
                    <h2 className="course-title">{name}</h2>
                </div>
                <p className="course-professor">Profesor: {professor}</p>
                <p className="course-description">{description}</p>
            </div>
        </div>
    );
};

export default CourseCard;