//import React, { useState, useRef, useEffect } from 'react';
//import { RiMenu3Line, RiCloseLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
//import { Link, useNavigate } from 'react-router-dom';
//import { useTranslation } from 'react-i18next';
//import './navbarLoggedIn.css';
//import { Dropdown, DropdownProps } from 'semantic-ui-react';
//import { useTheme } from '../../ThemeContext';
//import { userApi } from '../../services/api';
//import { useAuth } from '../../contexts/AuthContext';
//import { useCourses } from '../../contexts/CoursesContext';
//import logo from '../../assets/logo_t.svg';

//interface NavbarProps {
//    sidebarVisible: boolean;
//    toggleSidebar: () => void;
//}

//const NavbarLoggedIn: React.FC<NavbarProps> = ({ sidebarVisible, toggleSidebar }) => {
//    const { i18n } = useTranslation();
//    const { theme, toggleTheme } = useTheme();
//    const { state, logout } = useAuth();
//    const { resetCourses } = useCourses();
//    const { isAuthenticated, role, userName } = state;
//    const navigate = useNavigate();

//    const [fullName, setFullName] = useState<string | null>(null);
//    const [menuVisible, setMenuVisible] = useState(false);
//    const menuRef = useRef<HTMLDivElement>(null);

//    const handleLanguageChange = (_e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
//        i18n.changeLanguage(value?.toString()).catch(console.error);
//    };

//    const handleClickOutside = (event: MouseEvent) => {
//        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//            setMenuVisible(false);
//        }
//    };

//    useEffect(() => {
//        console.log('Auth state updated:', isAuthenticated, role, userName);

//        const fetchUserFullName = async () => {
//            if (userName) {
//                try {
//                    const user = await userApi.getuserbyid(userName);
//                    console.log('User data:', user);
//                    setFullName(`${user.data.firstName} ${user.data.lastName}`);
//                } catch (error) {
//                    console.error('Error fetching user data:', error);
//                }
//            }
//        };

//        fetchUserFullName();
//    }, [userName]);

//    useEffect(() => {
//        if (menuVisible) {
//            document.addEventListener('mousedown', handleClickOutside);
//        } else {
//            document.removeEventListener('mousedown', handleClickOutside);
//        }
//        return () => {
//            document.removeEventListener('mousedown', handleClickOutside);
//        };
//    }, [menuVisible]);

//    const handleLogout = async () => {
//        try {
//            //await logout();
//            await logout(resetCourses);
//            navigate('/');
//        } catch (error) {
//            console.error('Error logging out:', error);
//        }
//    };

//    return (
//        <div className={`gradient__bg sf__navbar_logged_in ${theme}`}>
//            <div className="sf__navbar_logged_in-links">
//                {/* Botón para mostrar/ocultar el sidebar */}
//                <div className="sf__navbar_logged_in-menu-icon" onClick={toggleSidebar}>
//                    {sidebarVisible ? <RiCloseLine color="#fff" size={27} /> : <RiMenu3Line color="#fff" size={27} />}
//                </div>
//                <div className="sf__navbar_logged_in-links_logo">
//                    <img src={logo} alt="logo" />
//                </div>
//                <div className="sf__navbar_logged_in-links_container">
//                    <p><Link to="/home_logged_in">{i18n.t('Home')}</Link></p>
//                    <p><Link to="/About_Us">{i18n.t('About_Us')}</Link></p>
//                </div>
//            </div>

//            {/* Controles de idioma, tema, nombre de usuario y logout */}
//            <div className="sf__navbar_logged_in-controls">
//                <Dropdown
//                    inline
//                    options={[
//                        { key: 'en', value: 'en', flag: 'us', text: 'En' },
//                        { key: 'es', value: 'es', flag: 'es', text: 'Es' },
//                    ]}
//                    defaultValue={i18n.language}
//                    onChange={handleLanguageChange}
//                />
//                <div className="sf__navbar_logged_in-theme" onClick={toggleTheme}>
//                    {theme === 'light' ? (
//                        <RiSunLine size={24} />
//                    ) : (
//                        <RiMoonLine size={24} />
//                    )}
//                </div>
//                {/* Nombre Completo del Usuario */}
//                <div className="sf__navbar_logged_in-user">
//                    <button type="button">
//                        {fullName || 'User'}
//                    </button>
//                </div>
//                <div className="sf__navbar_logged_in-logout-container">
//                    <button type="button" onClick={handleLogout}>
//                        Logout
//                    </button>
//                </div>
//            </div>

//            {/* Menú desplegable para pantallas pequeñas */}
//            <div className="sf__navbar_logged_in-menu" onClick={() => setMenuVisible(!menuVisible)}>
//                {menuVisible ? <RiCloseLine color="#fff" size={27} /> : <RiMenu3Line color="#fff" size={27} />}
//                {menuVisible && (
//                    <div ref={menuRef} className="sf__navbar_logged_in-menu_container scale-up-center">
//                        <div className="sf__navbar_logged_in-menu_container-group">
//                            <p><Link to="/home_logged_in">{i18n.t('Home')}</Link></p>
//                            <p><a href="#about">About Us</a></p>
//                        </div>
//                        <div className="sf__navbar_logged_in-menu_container-language sf__navbar_logged_in-menu_container-group">
//                            <Dropdown
//                                inline
//                                options={[
//                                    { key: 'en', value: 'en', flag: 'us', text: 'En' },
//                                    { key: 'es', value: 'es', flag: 'es', text: 'Es' },
//                                ]}
//                                defaultValue={i18n.language}
//                                onChange={handleLanguageChange}
//                            />
//                        </div>
//                        <div className="sf__navbar_logged_in-menu_container-theme sf__navbar_logged_in-menu_container-group">
//                            <div onClick={toggleTheme} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
//                                {theme === 'light' ? (
//                                    <RiSunLine size={24} />
//                                ) : (
//                                    <RiMoonLine size={24} />
//                                )}
//                            </div>
//                        </div>
//                        <div className="sf__navbar_logged_in-menu_container-group">
//                            <button type="button" onClick={handleLogout}>
//                                Logout
//                            </button>
//                        </div>
//                    </div>
//                )}
//            </div>
//        </div>
//    );
//};

//export default NavbarLoggedIn;

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RiMenu3Line, RiCloseLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './navbarLoggedIn.css';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { useTheme } from '../../ThemeContext';
import { userApi } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useCourses } from '../../contexts/CoursesContext';
import logo from '../../assets/logo_t.svg';

interface NavbarProps {
    sidebarVisible: boolean;
    toggleSidebar: () => void;
}

const NavbarLoggedIn: React.FC<NavbarProps> = ({ sidebarVisible, toggleSidebar }) => {
    const { i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { state, logout } = useAuth();
    const { resetCourses } = useCourses();
    const { userName } = state;
    const navigate = useNavigate();

    const [fullName, setFullName] = useState<string | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const fetchUserFullName = useCallback(async () => {
        if (userName) {
            try {
                const { data } = await userApi.getuserbyid(userName);
                setFullName(`${data.firstName} ${data.lastName}`);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }, [userName]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    }, []);

    useEffect(() => {
        fetchUserFullName();
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [fetchUserFullName, handleClickOutside]);

    const handleLogout = async () => {
        try {
            await logout(resetCourses);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleLanguageChange = (_e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
        i18n.changeLanguage(value?.toString()).catch(console.error);
    };

    return (
        <div className={`gradient__bg sf__navbar_logged_in ${theme}`}>
            <div className="sf__navbar_logged_in-links">
                <div className="sf__navbar_logged_in-menu-icon" onClick={toggleSidebar}>
                    {sidebarVisible ? <RiCloseLine size={27} /> : <RiMenu3Line size={27} />}
                </div>
                <div className="sf__navbar_logged_in-links_logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="sf__navbar_logged_in-links_container">
                    <p><Link to="/home_logged_in">{i18n.t('Home')}</Link></p>
                    <p><Link to="/About_Us">{i18n.t('About_Us')}</Link></p>
                </div>
            </div>

            {/* Controles */}
            <div className="sf__navbar_logged_in-controls">
                <Dropdown
                    inline
                    options={[
                        { key: 'en', value: 'en', flag: 'us', text: 'En' },
                        { key: 'es', value: 'es', flag: 'es', text: 'Es' },
                    ]}
                    defaultValue={i18n.language}
                    onChange={handleLanguageChange}
                />
                <div className="sf__navbar_logged_in-theme" onClick={toggleTheme}>
                    {theme === 'light' ? <RiSunLine size={24} /> : <RiMoonLine size={24} />}
                </div>
                <div className="sf__navbar_logged_in-user">
                    <button>{fullName || 'User'}</button>
                </div>
                <div className="sf__navbar_logged_in-logout-container">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Menú responsive */}
            <div className="sf__navbar_logged_in-menu" onClick={() => setMenuVisible(!menuVisible)}>
                {menuVisible ? <RiCloseLine size={27} /> : <RiMenu3Line size={27} />}
                {menuVisible && (
                    <div ref={menuRef} className="sf__navbar_logged_in-menu_container scale-up-center">
                        <div className="sf__navbar_logged_in-menu_container-group">
                            <p><Link to="/home_logged_in">{i18n.t('Home')}</Link></p>
                            <p><Link to="/About_Us">{i18n.t('About_Us')}</Link></p>
                        </div>
                        <div className="sf__navbar_logged_in-menu_container-language">
                            <Dropdown
                                inline
                                options={[
                                    { key: 'en', value: 'en', flag: 'us', text: 'En' },
                                    { key: 'es', value: 'es', flag: 'es', text: 'Es' },
                                ]}
                                defaultValue={i18n.language}
                                onChange={handleLanguageChange}
                            />
                        </div>
                        <div className="sf__navbar_logged_in-menu_container-theme" onClick={toggleTheme}>
                            {theme === 'light' ? <RiSunLine size={24} /> : <RiMoonLine size={24} />}
                        </div>
                        <div className="sf__navbar_logged_in-menu_container-group">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarLoggedIn;