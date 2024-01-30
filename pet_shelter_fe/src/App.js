import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import CitySearch from './components/CitySearch';
import NearbySearch from './components/NearbySearch';
import NavBar from './components/NavBar';
import './tailwind.css';

const App = () => {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Router basename="/">
      <div className="flex flex-col h-screen">
        <NavBar changeLanguage={changeLanguage}/>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
                <div className="lg:w-1/2 px-2 lg:px-5 py-2 lg:py-5 flex flex-col justify-between">
                  <h1 className="text-4xl md:text-6xl font-semibold text-main-color leading-tight mt-2 md:mt-4">{t('home.title')}</h1>
                  <p className='text-main-color text-md font-light my-2 md:my-4'>
                    {t('home.paragraph1')}
                  </p>
                  <p className='text-main-color text-md font-light my-2 md:my-4'>
                    {t('home.paragraph2')}
                  </p>
                  <div className="flex flex-col lg:flex-row gap-2 mb-4 md:mb-6">
                    <Link to="/find-nearest-shelter" className="no-underline">
                      <button className="w-full lg:w-64 h-16 px-4 justify-center items-center rounded-lg bg-button-gradient text-white text-2xl font-semibold">{t('navbar.findNearestShelter')}</button>
                    </Link>
                    <Link to="/find-shelter-in-your-town" className="no-underline">
                      <button className="w-full lg:w-64 h-16 px-4 justify-center items-center rounded-lg bg-button-gradient text-white text-2xl font-semibold">{t('navbar.findShelterInYourTown')}</button>
                    </Link>
                  </div>
                </div>
                <div className="lg:w-1/2 p-2 lg:p-3 lg:order-2 flex justify-center items-center">
                  <img src={process.env.PUBLIC_URL + "/back.webp"} alt="Animal Shelter" className="w-9/10 h-auto rounded-lg" />
                </div>
              </div>
            } />
            <Route path="/find-nearest-shelter" element={<NearbySearch />} />
            <Route path="/find-shelter-in-your-town" element={<CitySearch />} />
          </Routes>
        </div>
        <div className="text-center pb-4">
          <a href="https://nikolaidev.online" style={{ color: '#15708F', fontSize: '14px' }}>Nikolaidev.online, 2024</a>
        </div>
      </div>
    </Router>
  );
}

export default App;
