import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaHome, FaBook, FaUsers } from 'react-icons/fa';
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
                    <FaHome />
                    {t('announcements')}
                </button>
                <button onClick={() => setActiveSection('classwork')}>
                    <FaBook />
                    {t('classwork')}
                </button>
                <button onClick={() => setActiveSection('people')}>
                    <FaUsers />
                    {t('people')}
                </button>
            </div>
        </nav>
    );
};

export default NavBarCourse;