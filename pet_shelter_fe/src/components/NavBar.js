import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageModal from './LanguageModal';


const NavBar = ({ changeLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguageModal = () => {
    setIsLanguageModalOpen(!isLanguageModalOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeMenu();
    }
  };

  return (
    <nav 
      className="bg-main-color p-3 rounded-lg w-full mx-auto relative"
      onBlur={handleBlur}
      tabIndex="-1"
    >
      <div className="flex justify-between items-center">
        <NavLink to="/" className="flex items-center text-white no-underline mb-3 md:mb-0">
          <img src={process.env.PUBLIC_URL + "/logo.svg"} alt={t('navbar.logoAlt')} className="h-7" />
          <span className='ml-2'>Shelter</span>
        </NavLink>
        <div className="md:hidden">
          <button
            className="text-white md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen
              ? <img src={process.env.PUBLIC_URL + "/cross.svg"} alt="Close Menu" className="h-7" />
              : <img src={process.env.PUBLIC_URL + "/menu_icon.svg"} alt="Menu Icon" className="h-7" />
            }
          </button>
        </div>
        <div className="hidden md:flex space-x-14 pr-3">
          <NavLink to="/" className="text-white no-underline">{t('navbar.home')}</NavLink>
          <NavLink to="/find-nearest-shelter" className="text-white no-underline">{t('navbar.findNearestShelter')}</NavLink>
          <NavLink to="/find-shelter-in-your-town" className="text-white no-underline">{t('navbar.findShelterInYourTown')}</NavLink>
          <NavLink to="/about-us" className="text-white no-underline">{t('navbar.aboutUs')}</NavLink>
          <div className="md:flex space-x-14 pr-3">
            <div className="language-selector md:flex space-x-14 pr-3">
            <button onClick={toggleLanguageModal} className="text-white no-underline">
                {t('navbar.language')}
              </button>
            </div>
          </div>
          <LanguageModal
            isOpen={isLanguageModalOpen}
            onClose={() => setIsLanguageModalOpen(false)}
            changeLanguage={changeLanguage}
            currentLanguage={i18n.language}
          />
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-main-color flex flex-col items-center py-5 z-10">
          <NavLink to="/" className="text-white no-underline px-5 py-2 rounded hover:bg-white hover:bg-opacity-30 mb-2" onClick={toggleMenu}>
            {t('navbar.home')}
          </NavLink>
          <NavLink to="/find-nearest-shelter" className="text-white no-underline px-5 py-2 rounded hover:bg-white hover:bg-opacity-30 mb-2" onClick={toggleMenu}>
            {t('navbar.findNearestShelter')}
          </NavLink>
          <NavLink to="/find-shelter-in-your-town" className="text-white no-underline px-5 py-2 rounded hover:bg-white hover:bg-opacity-30 mb-2" onClick={toggleMenu}>
            {t('navbar.findShelterInYourTown')}
          </NavLink>
          <NavLink to="/about-us" className="text-white no-underline px-5 py-2 rounded hover:bg-white hover:bg-opacity-30 mb-2" onClick={toggleMenu}>
            {t('navbar.aboutUs')}
          </NavLink>

          <div className="md:flex space-x-14 pr-3">
            <div className="language-selector md:flex space-x-14 pr-3">
              <button onClick={toggleLanguageModal} className="text-white no-underline">
                {t('navbar.language')}
              </button>
            </div>
          </div>
          <LanguageModal
            isOpen={isLanguageModalOpen}
            onClose={() => setIsLanguageModalOpen(false)}
            changeLanguage={changeLanguage}
            currentLanguage={i18n.language}
          />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
