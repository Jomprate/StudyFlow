import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './navbar.css';
import logo from '../../assets/logo_t.svg';
import { AuthModal, LoginModal } from '../../Components';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

const Menu: React.FC = () => (
  <>
    <p>
      <Link to="/">{useTranslation().t('Home')}</Link>
    </p>
    <p>
      <Link to="/countries">{useTranslation().t('Countries')}</Link>
    </p>
    <p>
      <a href="#testa">test a</a>
    </p>
    <p>
      <a href="#testb">test b</a>
    </p>
    <p>
      <a href="#about">About Us</a>
    </p>
  </>
);

const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n
        .changeLanguage(savedLanguage)
        .then(() => {
          console.log('Idioma cambiado a:', savedLanguage);
        })
        .catch((error) => {
          console.error('Error al cambiar el idioma:', error);
        });
    }
  }, [i18n]);

  const handleLanguageChange = (e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
    i18n
      .changeLanguage(value?.toString())
      .then(() => {
        localStorage.setItem('language', value?.toString() || '');
      })
      .catch((error) => {
        console.error('Error al cambiar el idioma:', error);
      });
  };

  return (
    <div className="gradient__bg navbar">
      <div className="sf__navbar">
        <div className="sf__navbar-links">
          <div className="sf__navbar-links_logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="sf__navbar-links_container">
          <Menu />
        </div>
        <div className="sf__navbar-language" style={{ marginLeft: '20px' }}>
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
        <div className="sf__navbar-sign-container">
          <div className="sf__navbar-sign" style={{ marginLeft: '10px' }}>
            <p onClick={() => setOpenLoginModal(true)}>Sign in</p>
            <button type="button" onClick={() => setOpenAuthModal(true)}>
              Sign up
            </button>
          </div>
        </div>
        <div className="sf__navbar-menu" onClick={() => setToggleMenu(!toggleMenu)}>
          {toggleMenu ? <RiCloseLine color="#fff" size={27} /> : <RiMenu3Line color="#fff" size={27} />}
          {toggleMenu && (
            <div className="sf__navbar-menu_container scale-up-center">
              <div className="sf__navbar-menu_container-group">
                <Menu />
              </div>
              <div className="sf__navbar-menu_container-group">
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
              <div className="sf__navbar-menu_container-group">
                <p onClick={() => setOpenLoginModal(true)}>Sign in</p>
                <button type="button" onClick={() => setOpenAuthModal(true)}>
                  Sign up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
      <AuthModal open={openAuthModal} setOpen={setOpenAuthModal} />
    </div>
  );
};

export default Navbar;
