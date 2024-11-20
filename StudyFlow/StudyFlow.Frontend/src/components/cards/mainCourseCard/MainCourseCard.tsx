import React from 'react';
import './mainCourseCard.css';
import { useTheme } from '../../../ThemeContext';
import { useTranslation } from 'react-i18next';
import CurseImage from '../../../assets/user_p.svg';

interface CourseCardProps {
    key: string;
    name: string;
    description: string;
    teacher: string;
    image: string;
}

const MainCourseCard: React.FC<CourseCardProps> = ({ name, description, teacher, image }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
        <div className={`main_course-card ${theme}`}>
            <img
                src={image ? `data:image/png;base64,${image}` : CurseImage}
                alt={name}
                className="main_course-image"
            />
            <div className="main_course-details">
                <div className="main_course-title-container">
                    <h2 className="main_course-title">{name}</h2>
                </div>
                <p className="main_course-teacher">{t('teacher')}: {teacher}</p>
                <p className="main_course-description">{description}</p>
            </div>
        </div>
    );
};

export default MainCourseCard;