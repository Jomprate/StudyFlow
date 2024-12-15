import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarLoggedIn from '../../navBarLoggedIn/NavbarLoggedIn';
import SidebarMenu from '../../sideBarMenu/SideBarMenu';
import './loggedInMainLayout.css';
import Footer from '../../../containers/footer/Footer';

const LoggedInMainLayout: React.FC = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setSidebarVisible(false);
        } else {
            setSidebarVisible(true);
        }
    };

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="main-layout">
            <NavbarLoggedIn sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
            <div className="layout-container">
                <SidebarMenu visible={sidebarVisible} />
                <div className={`main-content ${sidebarVisible ? '' : 'hidden'}`}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoggedInMainLayout;