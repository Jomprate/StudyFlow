import React from 'react';
import './courseCard.css';
import { useTheme } from '../../ThemeContext'; // Aseg�rate de que el contexto est� funcionando correctamente
import CurseImage from '../../assets/user_p.svg'; // Importaci�n del SVG como imagen

interface CourseCardProps {
    name: string;
    description: string;
    professor: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, description, professor }) => {
    const { theme } = useTheme(); // Esto deber�a devolver 'light' o 'dark'

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