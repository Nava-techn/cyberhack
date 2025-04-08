// src/components/Regles.js
import React from 'react';
import './Regles.css';

import regles1 from '../assets/regles/A4 - 1.png';
import regles2 from '../assets/regles/A4 - 2.png';
import regles3 from '../assets/regles/A4 - 3.png';
import regles4 from '../assets/regles/A4 - 4.png';
import regles5 from '../assets/regles/A4 - 5.png';
import regles6 from '../assets/regles/A4 - 6.png';
import regles7 from '../assets/regles/A4 - 7.png';
import regles8 from '../assets/regles/A4 - 8.png';

const Regles = () => {
  return (
    
    <div className="regles-container">
        
        <h2 className="regles-title">Règles du jeu</h2>
          <div className="regles-images">
            <img src={regles1} alt="étape 1" />
            <img src={regles2} alt="étape 2" />
            <img src={regles3} alt="étape 3" />
            <img src={regles4} alt="étape 4" />
            <img src={regles5} alt="étape 5" />
            <img src={regles6} alt="étape 6" />
            <img src={regles7} alt="étape 7" />
            <img src={regles8} alt="étape 8" />
        </div>
    </div>
  );
};

export default Regles;
