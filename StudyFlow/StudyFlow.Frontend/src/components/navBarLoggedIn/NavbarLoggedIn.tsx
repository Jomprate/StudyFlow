import React, { useState, useRef, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './navbarLoggedIn.css';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { useTheme } from '../../ThemeContext';
import { useAuth } from '../../contexts/AuthContext'; // Importar el contexto de autenticación
import logo from '../../assets/logo_t.svg';
interface NavbarProps {
    sidebarVisible: boolean;
    toggleSidebar: () => void;
}

const NavbarLoggedIn: React.FC<NavbarProps> = ({ sidebarVisible, toggleSidebar }) => {
    const { i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { state, logout } = useAuth(); // Usar el contexto de autenticación

    // Estado para manejar la visibilidad del menú
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLanguageChange = (_e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
        i18n.changeLanguage(value?.toString()).catch(console.error);
    };

    // Manejar clic fuera del menú para cerrarlo
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        if (menuVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuVisible]);

    const handleLogout = () => {
        logout(); // Cerrar sesión usando el contexto
        window.location.href = '/'; // Redirigir a la página de inicio después de cerrar sesión
    };

    return (
        <div className={`gradient__bg sf__navbar_logged_in ${theme}`}>
            <div className="sf__navbar_logged_in-links">
                {/* Icono que controla la visibilidad del Sidebar */}
                <div className="sf__navbar_logged_in-menu-icon" onClick={toggleSidebar}>
                    {sidebarVisible ? <RiCloseLine color="#fff" size={27} /> : <RiMenu3Line color="#fff" size={27} />}
                </div>
                <div className="sf__navbar_logged_in-links_logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="sf__navbar_logged_in-links_container">
                    <p><Link to="/home_logged_in">{i18n.t('Home')}</Link></p>
                    <p><a href="#about">About Us</a></p>
                </div>
            </div>

            {/* Controles del idioma, tema y usuario */}
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
                    {theme === 'light' ? (
                        <RiSunLine size={24} />
                    ) : (
                        <RiMoonLine size={24} />
                    )}
                </div>
                <div className="sf__navbar_logged_in-logout-container">
                    <button type="button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Menú desplegable para pantallas más pequeñas */}
            <div className="sf__navbar_logged_in-menu" onClick={() => setMenuVisible(!menuVisible)}>
                {menuVisible ? <RiCloseLine color="#fff" size={27} /> : <RiMenu3Line color="#fff" size={27} />}
                {menuVisible && (
                    <div ref={menuRef} className="sf__navbar_logged_in-menu_container scale-up-center">
                        <div className="sf__navbar_logged_in-menu_container-group">
                            <p><Link to="/home_logged_in">{i18n.t('Home')}</Link></p>
                            <p><a href="#about">About Us</a></p>
                        </div>
                        <div className="sf__navbar_logged_in-menu_container-language sf__navbar_logged_in-menu_container-group">
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
                        <div className="sf__navbar_logged_in-menu_container-theme sf__navbar_logged_in-menu_container-group">
                            <div onClick={toggleTheme} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                {theme === 'light' ? (
                                    <RiSunLine size={24} />
                                ) : (
                                    <RiMoonLine size={24} />
                                )}
                            </div>
                        </div>
                        <div className="sf__navbar_logged_in-menu_container-group">
                            <button type="button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarLoggedIn;