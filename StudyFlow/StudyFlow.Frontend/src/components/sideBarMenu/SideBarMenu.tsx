import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineRequestPage } from 'react-icons/md';
import './sidebarMenu.css';

const SidebarMenu: React.FC<{ visible: boolean; toggleSidebar: () => void }> = ({ visible, toggleSidebar }) => {
    const location = useLocation();
    const { t } = useTranslation();

    return (
        <div className={`custom-sidebar ${visible ? '' : 'collapsed'}`}>
            <div className="sidebar-header">
                <button onClick={toggleSidebar} className={`toggle-sidebar-btn ${!visible ? 'collapsed' : ''}`}>
                    {visible ? t('close') : t('open')}
                </button>

            </div>
            <nav>
                <ul>
                    <li className={`item ${location.pathname === '/courses' ? 'active' : ''}`}>
                        <Link to="courses">
                            <AiOutlineHome className="icon" />
                            {visible && <span>Courses</span>}
                        </Link>
                    </li>
                    <li className={`item ${location.pathname === '/notifications' ? 'active' : ''}`}>
                        <Link to="notifications">
                            <AiOutlineBell className="icon" />
                            {visible && <span>Notifications</span>}
                        </Link>
                    </li>
                    <li className={`item ${location.pathname === '/requests' ? 'active' : ''}`}>
                        <Link to="requests">
                            <MdOutlineRequestPage className="icon" />
                            {visible && <span>Requests</span>}
                        </Link>
                    </li>
                    <li className={`item ${location.pathname === '/settings' ? 'active' : ''}`}>
                        <Link to="settings">
                            <AiOutlineSetting className="icon" />
                            {visible && <span>Settings</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SidebarMenu;