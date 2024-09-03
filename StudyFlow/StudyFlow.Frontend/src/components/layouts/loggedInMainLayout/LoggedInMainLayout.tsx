import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarLoggedIn from '../../navBarLoggedIn/NavbarLoggedIn';
import SidebarMenu from '../../sideBarMenu/SideBarMenu';
import './loggedInMainLayout.css';

const LoggedInMainLayout: React.FC = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="main-layout">
            {/* Navbar fijo en la parte superior */}
            <NavbarLoggedIn />

            <div className="layout-container">
                <SidebarMenu visible={sidebarVisible} toggleSidebar={toggleSidebar} />

                <div className={`main-content ${sidebarVisible ? '' : 'collapsed'}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default LoggedInMainLayout;