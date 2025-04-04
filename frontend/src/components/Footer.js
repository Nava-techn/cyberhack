import React from 'react';
import './Footer.css'; // Nous créerons ce fichier plus tard

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>@CyberGame</span>
        <button>À propos de nous</button>
        <button>Nous contacter</button>
        <div className="language-selector">
          <span>Langues :</span>
          <select>
            <option>Français</option>
            <option>English</option>
            <option>Español</option>
          </select>
        </div>
        <button>Politique de confidentialité</button>
      </div>
    </footer>
  );
};

export default Footer;