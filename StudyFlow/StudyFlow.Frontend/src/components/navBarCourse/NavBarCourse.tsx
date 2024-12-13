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
                    {t('navBarCourse_Announcements')}
                </button>
                <button onClick={() => setActiveSection('classwork')}>
                    <FaBook />
                    {t('navBarCourse_Classwork')}
                </button>
                <button onClick={() => setActiveSection('people')}>
                    <FaUsers />
                    {t('navBarCourse_People')}
                </button>
            </div>
        </nav>
    );
};

export default NavBarCourse;