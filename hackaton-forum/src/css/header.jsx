import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
            <li>
                <Link to="/login">Se connecter</Link>
            </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
