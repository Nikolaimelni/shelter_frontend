import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'; 

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" exact className={styles.navItem} activeClassName={styles.activeNavItem}>
        <div className={styles.leftSide}>
          <img src="/logo.svg" alt="Shelter Logo" className={styles.logo} />
          <p>Shelter</p>
        </div>
      </NavLink>
      <div className={styles.rightSide}>
        <NavLink to="/" exact className={styles.navItem} activeClassName={styles.activeNavItem}>Home</NavLink>
        <NavLink to="/find-nearest-shelter" className={styles.navItem} activeClassName={styles.activeNavItem}>Find Nearest Shelter</NavLink>
        <NavLink to="/find-shelter-in-your-town" className={styles.navItem} activeClassName={styles.activeNavItem}>Find Shelter in Your Town</NavLink>
        <NavLink to="/about-us" className={styles.navItem} activeClassName={styles.activeNavItem}>About Us</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
