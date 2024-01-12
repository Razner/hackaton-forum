
import React from 'react';
import logoImage from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const redirectToMessages = () => {
    console.log("Rediriger vers la page des messages");
  };

  return (
    <div className="header">
      <img src={logoImage} alt="logo" className="logo" />
      <div className="icons" onClick={redirectToMessages}>
          <FontAwesomeIcon icon={faBell} className="icon" />
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
        </div>
      <div className="user-info">
        <p>@Nom de l'utilisateur</p>
      </div>
    </div>
  );
};

export default Header;
