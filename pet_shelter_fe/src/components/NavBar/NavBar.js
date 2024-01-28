import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="Shelter Logo" className="h-7" />
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
          <NavLink to="/" className="text-white no-underline">Home</NavLink>
          <NavLink to="/find-nearest-shelter" className="text-white no-underline">Find Nearest Shelter</NavLink>
          <NavLink to="/find-shelter-in-your-town" className="text-white no-underline">Find Shelter in Your Town</NavLink>
          <NavLink to="/about-us" className="text-white no-underline">About Us</NavLink>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-main-color flex flex-col items-center py-5 z-10">
          <NavLink to="/" className="text-white no-underline px-5 py-2 rounded hover:bg-white hover:bg-opacity-30 mb-2" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/find-nearest-shelter" className="text-white no-underline px-5 py-2 rounded hover:bg-white hover:bg-opacity-30 mb-2" onClick={toggleMenu}>Find Nearest Shelter</NavLink>
          <NavLink to="/find-shelter-in-your-town" className="text-white no-underline px-5 py-2 rounded hover:bg-white hover:bg-opacity-30 mb-2" onClick={toggleMenu}>Find Shelter in Your Town</NavLink>
          <NavLink to="/about-us" className="text-white no-underline px-5 py-2 rounded hover:bg-white hover:bg-opacity-30 mb-2" onClick={toggleMenu}>About Us</NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
