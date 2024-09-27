import React from 'react';
import { useTranslation } from 'react-i18next';
import './course_classwork.css';

const Course_Classwork: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="course_classwork-page">
            <h2 className="course_classwork-header">{t('trabajo_en_clase')}</h2>
            <ul className="course_classwork-list">
                <li>
                    <span className="course_classwork-title">{t('tema1')}</span>
                    <p className="course_classwork-description">{t('descripcion_tema1')}</p>
                </li>
                <li>
                    <span className="course_classwork-title">{t('tema2')}</span>
                    <p className="course_classwork-description">{t('descripcion_tema2')}</p>
                </li>
            </ul>
        </div>
    );
};

export default Course_Classwork;