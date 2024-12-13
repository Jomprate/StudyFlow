import React, { useState, useEffect, useRef } from 'react';
import { RiMenu3Line, RiCloseLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './navbar.css';
import logo from '../../assets/logo_t.svg';
import { AuthModal, LoginModal } from '../../components';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { useTheme } from '../../ThemeContext';

const Menu: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <p>
                <Link to="/">{t('Home')}</Link>
            </p>
            <p>
                <Link to="/countries">{t('Countries')}</Link>
            </p>
            <p>
                <Link to="/notification">{t('Notification')}</Link>
            </p>
            <p>
                <Link to="/home_logged_in">test a</Link>
            </p>
            <p>
                <a href="#testb">test b</a>
            </p>
            <p>
                <a href="#about">{t('About_Us')}</a>
            </p>
        </>
    );
};

const Navbar: React.FC = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && i18n.language !== savedLanguage) {
            i18n.changeLanguage(savedLanguage).catch((error) => {
                console.error('Error al cambiar el idioma:', error);
            });
        }
    }, [i18n]);

    const handleLanguageChange = (_e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
        i18n.changeLanguage(value?.toString()).catch((error) => {
            console.error('Error al cambiar el idioma:', error);
        });
        localStorage.setItem('language', value?.toString() || '');
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
        <div className={`gradient__bg sf__navbar ${theme}`}>
            <div className="sf__navbar-links">
                <div className="sf__navbar-links_logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="sf__navbar-links_container">
                    <Menu />
                </div>
            </div>
            {!toggleMenu && (
                <div className="sf__navbar-language-theme">
                    <Dropdown
                        inline
                        options={[
                            { key: 'en', value: 'en', flag: 'us', text: 'En' },
                            { key: 'es', value: 'es', flag: 'es', text: 'Es' },
                        ]}
                        defaultValue={i18n.language}
                        onChange={handleLanguageChange}
                    />
                    <div
                        onClick={toggleTheme}
                        style={{
                            cursor: 'pointer',
                            marginLeft: '10px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {theme === 'light' ? <RiSunLine size={24} /> : <RiMoonLine size={24} />}
                    </div>
                </div>
            )}
            {!toggleMenu && (
                <div className="sf__navbar-sign-container">
                    <div className="sf__navbar-sign" style={{ marginLeft: '10px' }}>
                        <p onClick={() => setOpenLoginModal(true)}>{t('navBar_Login')}</p>
                        <button type="button" onClick={() => setOpenAuthModal(true)}>
                            {t('navBar_SignUp')}
                        </button>
                    </div>
                </div>
            )}
            <div className="sf__navbar-menu" onClick={() => setToggleMenu(!toggleMenu)}>
                {toggleMenu ? <RiCloseLine color="#fff" size={27} /> : <RiMenu3Line color="#fff" size={27} />}
                {toggleMenu && (
                    <div ref={menuRef} className="sf__navbar-menu_container scale-up-center">
                        <div className="sf__navbar-menu_container-group">
                            <Menu />
                        </div>
                        <div className="sf__navbar-menu_container-language sf__navbar-menu_container-group">
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
                        <div className="sf__navbar-menu_container-theme sf__navbar-menu_container-group">
                            <div
                                onClick={toggleTheme}
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                                {theme === 'light' ? <RiSunLine size={24} /> : <RiMoonLine size={24} />}
                            </div>
                        </div>
                        <div className="sf__navbar-menu_container-group">
                            <p onClick={() => setOpenLoginModal(true)}>{t('navBar_Login')}</p>
                            <button type="button" onClick={() => setOpenAuthModal(true)}>
                                {t('navBar_SignUp')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
            <AuthModal open={openAuthModal} setOpen={setOpenAuthModal} />
        </div>
    );
};

export default Navbar;