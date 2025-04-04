import React, { useState } from 'react';
import './Navbar.css'; // Nous créerons ce fichier plus tard
import logo from '../assets/logo.png';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={toggleMenu}>
          ☰ Menu
        </button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <a href="/Login"><button>Mon compte         </button></a>
            <button>Présentation du jeu</button>
            <button>Fonctionnalités    </button>
            <button>À propos de nous   </button>
            <a href="/"><button>Quitter            </button></a>
          </div>
        )}
        <img src={logo} alt="Cyber@Hack" className="logo" />
        <span className="game-name">Cyber@Hack</span>
      </div>
      <div className="navbar-right">
        <a href="/"><button>Accueil</button></a>
        <span>|</span>
        <button>Règles du jeu</button>
        <span>|</span>
        <button>Guide</button>
        <span>|</span>
        <a href="/Login"><button>Compte</button></a>
      </div>
    </nav>
  );
};

export default Navbar;