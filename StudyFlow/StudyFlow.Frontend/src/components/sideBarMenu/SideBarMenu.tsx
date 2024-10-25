import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineRequestPage } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';          // Opción de calendario de Boxicons
import { HiOutlineBookOpen } from 'react-icons/hi';   // Opción de libro de Heroicons
import './sidebarMenu.css';

interface SidebarMenuProps {
    visible: boolean;
    toggleSidebar: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ visible }) => {
    const location = useLocation();
    const { t } = useTranslation();

    return (
        <div className={`custom-sidebar ${visible ? '' : 'collapsed'}`}>
            <nav>
                <ul>
                    <li className={`item ${location.pathname === '/mainloggedin' ? 'active' : ''}`}>
                        <Link to="mainloggedin">
                            <AiOutlineHome className="icon" />
                            {visible && <span>{t('Main')}</span>}
                        </Link>
                    </li>

                    {/* Icono alternativo para Courses */}
                    <li className={`item ${location.pathname === '/courses' ? 'active' : ''}`}>
                        <Link to="courses">
                            <HiOutlineBookOpen className="icon" />
                            {visible && <span>{t('sideBar_loggedIn_Courses')}</span>}
                        </Link>
                    </li>

                    <li className={`sub-item ${location.pathname === '/course' ? 'active' : ''}`}>
                        <Link to="course">
                            <HiOutlineBookOpen className="icon" />
                            {visible && <span>{t('Course')}</span>}
                        </Link>
                    </li>

                    {/* Icono alternativo para Calendar */}
                    <li className={`item ${location.pathname === '/calendar' ? 'active' : ''}`}>
                        <Link to="calendar">
                            <BiCalendar className="icon" />
                            {visible && <span>{t('Calendar')}</span>}
                        </Link>
                    </li>

                    <li className={`item ${location.pathname === '/notifications' ? 'active' : ''}`}>
                        <Link to="notifications">
                            <AiOutlineBell className="icon" />
                            {visible && <span>{t('Notifications')}</span>}
                        </Link>
                    </li>

                    <li className={`item ${location.pathname === '/requests' ? 'active' : ''}`}>
                        <Link to="requests">
                            <MdOutlineRequestPage className="icon" />
                            {visible && <span>{t('Requests')}</span>}
                        </Link>
                    </li>

                    <li className={`item ${location.pathname === '/settings' ? 'active' : ''}`}>
                        <Link to="settings">
                            <AiOutlineSetting className="icon" />
                            {visible && <span>{t('Settings')}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SidebarMenu;