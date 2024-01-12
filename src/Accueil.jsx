// Navbar.js

import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/profil">Profil</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
