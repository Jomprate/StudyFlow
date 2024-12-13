import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarLoggedIn from '../../navBarLoggedIn/NavbarLoggedIn';
import SidebarMenu from '../../sideBarMenu/SideBarMenu';
import Footer from '../../../containers/footer/Footer';
import './loggedInMainLayout.css';

const LoggedInMainLayout: React.FC = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const sidebarRef = useRef<{ fetchCourses: () => void } | null>(null);

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
                <SidebarMenu visible={sidebarVisible} ref={sidebarRef} />
                <div className={`main-content ${sidebarVisible ? '' : 'hidden'}`}>
                    <Outlet context={{ refreshCourses: sidebarRef.current?.fetchCourses }} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoggedInMainLayout;