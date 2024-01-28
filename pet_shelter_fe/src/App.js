import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import CitySearch from './components/CitySearch/CitySearch';
import NearbySearch from './components/NearbySearch/NearbySearch';
import NavBar from './components/NavBar/NavBar';
import './tailwind.css';

const App = () => {
  return (
    <Router basename="/">
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
                <div className="lg:w-1/2 px-2 lg:px-5 py-2 lg:py-5 flex flex-col justify-between">
                  <h1 className="text-4xl md:text-6xl font-semibold text-main-color leading-tight mt-2 md:mt-4">Find Animal Shelters</h1>
                  <p className='text-main-color text-md font-light my-2 md:my-4'>
                    Have you found a stray animal and can’t keep it, but really want to help? Don’t pass by, 
                    do the minimum after which you won’t reproach yourself. 
                    Or can't afford to Find the nearest shelter and hand him over there, this way you will save his life.
                  </p>
                  <p className='text-main-color text-md font-light my-2 md:my-4'>
                    Have you found a stray animal and can’t keep it, but really want to help? Don’t pass by, 
                    do the minimum after which you won’t reproach yourself. 
                    Or can't afford to Find the nearest shelter and hand him over there, this way you will save his life.
                  </p>
                  <div className="flex flex-col lg:flex-row gap-2 mb-4 md:mb-6">
                    <Link to="/find-nearest-shelter" className="no-underline">
                      <button className="w-full lg:w-64 h-16 px-4 justify-center items-center rounded-lg bg-button-gradient text-white text-2xl font-semibold">Find Nearest Shelter</button>
                    </Link>
                    <Link to="/find-shelter-in-your-town" className="no-underline">
                      <button className="w-full lg:w-64 h-16 px-4 justify-center items-center rounded-lg bg-button-gradient text-white text-2xl font-semibold">Find Shelter in Your Town</button>
                    </Link>
                  </div>
                </div>
                <div className="lg:w-1/2 p-2 lg:p-3 lg:order-2 flex justify-center items-center">
                  <img src={process.env.PUBLIC_URL + "/back.png"} alt="Animal Shelter" className="w-auto h-auto max-w-xs lg:max-w-full" />
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
