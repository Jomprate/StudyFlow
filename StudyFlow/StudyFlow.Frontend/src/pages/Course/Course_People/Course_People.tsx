import React from 'react';
import { useTranslation } from 'react-i18next';
import './course_people.css';

const Course_People: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="course_people-page">
            <h2 className="course_people-header">{t('personas')}</h2>
            <ul className="course_people-list">
                <li>
                    <span className="course_people-name">Juan P�rez</span>
                    <span className="course_people-role">{t('profesor')}</span>
                </li>
                <li>
                    <span className="course_people-name">Ana G�mez</span>
                    <span className="course_people-role">{t('estudiante')}</span>
                </li>
                {/* A�ade m�s personas si es necesario */}
            </ul>
        </div>
    );
};

export default Course_People;