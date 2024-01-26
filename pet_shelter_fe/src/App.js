import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import CitySearch from './components/CitySearch/CitySearch';
import NearbySearch from './components/NearbySearch/NearbySearch';
import NavBar from './components/NavBar/NavBar';
import styles from './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <div className="contentContainer">
              <div className="leftSide">
                <h1 className="AppHeader">Find Animal Shelters</h1>
                <p className='par'>
                  Have you found a stray animal and can’t keep it, but really want to help? Don’t pass by, 
                  do the minimum after which you won’t reproach yourself. 
                  Or can't afford to Find the nearest shelter and hand him over there, this way you will save his life.
                </p>
                <p className='par'>
                Have you found a stray animal and can’t keep it, but really want to help? 
                Don’t pass by, do the minimum after which you won’t reproach yourself. Or can't afford to 
                find the nearest shelter and hand him over there, this way you will save his life.
                </p>
                <div className="buttonsContainer">
                  <Link to="/find-nearest-shelter">
                    <button className="button">Find Nearest Shelter</button>
                  </Link>
                  <Link to="/find-shelter-in-your-town">
                    <button className="button">Find Shelter in Your Town</button>
                  </Link>
                </div>
              </div>
              <div className="rightSide">
                <img src="/back.png" alt="Animal Shelter" className="shelterImage" />
              </div>
            </div>
          } />
          <Route path="/find-nearest-shelter" element={<NearbySearch />} />
          <Route path="/find-shelter-in-your-town" element={<CitySearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
