import React from 'react';
import './courseCard.css';
import { useTheme } from '../../ThemeContext';
import CurseImage from '../../assets/user_p.svg';

interface CourseCardProps {
    name: string;
    description: string;
    teacher: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, description, teacher }) => {
    const { theme } = useTheme();

    return (
        <div className={`course-card ${theme}`}>
            <img src={CurseImage} alt={name} className="course-image" />
            <div className="course-details">
                <div className="course-title-container">
                    <h2 className="course-title">{name}</h2>
                </div>
                <p className="course-teacher">Profesor: {teacher}</p>
                <p className="course-description">{description}</p>
            </div>
        </div>
    );
};

export default CourseCard;