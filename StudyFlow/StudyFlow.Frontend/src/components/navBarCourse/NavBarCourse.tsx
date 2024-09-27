import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaHome, FaBook, FaUsers } from 'react-icons/fa'; // Importa los íconos que necesitas
import './navBarCourse.css';

interface NavBarCourseProps {
    setActiveSection: (section: string) => void;
}

const NavBarCourse: React.FC<NavBarCourseProps> = ({ setActiveSection }) => {
    const { t } = useTranslation();

    return (
        <nav className="navBarCourse">
            <div className="navBarCourse-links">
                <button onClick={() => setActiveSection('announcements')}>
                    <FaHome /> {/* Ícono de casa */}
                    {t('announcements')}
                </button>
                <button onClick={() => setActiveSection('classwork')}>
                    <FaBook /> {/* Ícono de libro */}
                    {t('classwork')}
                </button>
                <button onClick={() => setActiveSection('people')}>
                    <FaUsers /> {/* Ícono de personas */}
                    {t('people')}
                </button>
            </div>
        </nav>
    );
};

export default NavBarCourse;
