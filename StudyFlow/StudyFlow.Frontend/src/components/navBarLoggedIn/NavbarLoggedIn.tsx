import React, { useState, useEffect, useRef } from 'react';
import { RiMenu3Line, RiCloseLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './navbarLoggedIn.css';
import logo from '../../assets/logo_t.svg';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { useTheme } from '../../ThemeContext';

const NavbarLoggedIn: React.FC = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const { i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLanguageChange = (e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
        i18n.changeLanguage(value?.toString()).catch(console.error);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setToggleMenu(false);
        }
    };

    useEffect(() => {
        if (toggleMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggleMenu]);

    return (
        <div className={`gradient__bg sf__navbar_logged_in ${theme}`}>
            <div className="sf__navbar_logged_in-links">
                <div className="sf__navbar_logged_in-links_logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="sf__navbar_logged_in-links_container">
                    <p><Link to="/">{i18n.t('Home')}</Link></p>
                    <p><Link to="/countries">{i18n.t('Countries')}</Link></p>
                    <p><Link to="/home_logged_in">test a</Link></p>
                    <p><a href="#testb">test b</a></p>
                    <p><a href="#about">About Us</a></p>
                </div>
            </div>
            {!toggleMenu && (
                <div className="sf__navbar_logged_in-language">
                    <Dropdown
                        inline
                        options={[
                            { key: 'en', value: 'en', flag: 'us', text: 'En' },
                            { key: 'es', value: 'es', flag: 'es', text: 'Es' },
                        ]}
                        defaultValue={i18n.language}
                        onChange={handleLanguageChange}
                    />
                    <div onClick={toggleTheme} style={{ cursor: 'pointer', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                        {theme === 'light' ? (
                            <RiSunLine size={24} />
                        ) : (
                            <RiMoonLine size={24} />
                        )}
                    </div>
                </div>
            )}
            {!toggleMenu && (
                <div className="sf__navbar_logged_in-logout-container">
                    <button type="button" onClick={() => console.log('Logout')}>
                        Logout
                    </button>
                </div>
            )}
            <div className="sf__navbar_logged_in-menu" onClick={() => setToggleMenu(!toggleMenu)}>
                {toggleMenu ? <RiCloseLine color="#fff" size={27} /> : <RiMenu3Line color="#fff" size={27} />}
                {toggleMenu && (
                    <div ref={menuRef} className="sf__navbar_logged_in-menu_container scale-up-center">
                        <div className="sf__navbar_logged_in-menu_container-group">
                            <p><Link to="/">{i18n.t('Home')}</Link></p>
                            <p><Link to="/countries">{i18n.t('Countries')}</Link></p>
                            <p><Link to="/home_logged_in">test a</Link></p>
                            <p><a href="#testb">test b</a></p>
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
                            <button type="button" onClick={() => console.log('Logout')}>
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