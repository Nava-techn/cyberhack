import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-button" onClick={toggleMenu}>
            ☰ Menu
          </button>
          {isMenuOpen && (
            <div className="dropdown-menu">
              <a href="/Login"><button>Mon compte</button></a>
              <button>Présentation du jeu</button>
              <button>Fonctionnalités</button>
              <button>À propos de nous</button>
              <a href="/"><button>Quitter</button></a>
            </div>
          )}
          <img src={logo} alt="Cyber@Hack" className="logo" />
          <span className="game-name">Cyber@Hack</span>
        </div>
        <div className="navbar-right">
          <a href="/"><button>Accueil</button></a>
          <span>|</span>
          <a href="/Regles"><button>Règles du jeu</button></a>
          <span>|</span>
          <a href="/Guide"><button>Guide</button></a>
          <span>|</span>
          <a href="/Login"><button>Compte</button></a>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
