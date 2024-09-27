import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './course.css';
import { useTheme } from '../../ThemeContext';
import NavBarCourse from '@components/NavBarCourse/NavBarCourse'; // Asegúrate de que la ruta sea correcta
import Course_Announces from './Course_Announces/Course_Announces'; // Asegúrate de que la ruta sea correcta
import Course_Classwork from './Course_Classwork/Course_Classwork'; // Asegúrate de que la ruta sea correcta
import Course_People from './Course_People/Course_People'; // Asegúrate de que la ruta sea correcta

const Course: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    // Estado para controlar qué sección está activa
    const [activeSection, setActiveSection] = useState<string>('announcements');

    // Renderizado condicional basado en la sección activa
    const renderSection = () => {
        switch (activeSection) {
            case 'announcements':
                return <Course_Announces />;
            case 'classwork':
                return <Course_Classwork />;
            case 'people':
                return <Course_People />;
            default:
                return <Course_Announces />;
        }
    };

    return (
        <div className={`course-page ${theme}`}>
            {/* Aquí pasamos la función setActiveSection al NavBarCourse */}
            <NavBarCourse setActiveSection={setActiveSection} />
            <div className="course-container">
                <div className="course-header">
                    <h1>2024-II G2 Software Construction</h1>
                    <h2>Software Engineering Specialization</h2>
                </div>

                <div className="course-layout">
                    {renderSection()} {/* Renderizar la sección correspondiente */}
                </div>
            </div>
        </div>
    );
};

export default Course;