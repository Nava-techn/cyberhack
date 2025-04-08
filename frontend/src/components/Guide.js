// src/components/Guide.js
import React, { useState } from 'react';
import './Guide.css';

// Importation dynamique des images des cartes avec require.context
const importImages = (context) => {
  const images = {};
  context.keys().forEach((item) => {
    const path = item.replace('./', '').replace('.png', '');
    images[path] = context(item);
  });
  return images;
};

const attaqueImages = importImages(require.context('../assets/attaques', false, /\.png$/));
const bouclierImages = importImages(require.context('../assets/boucliers', false, /\.png$/));
const secteurImages = importImages(require.context('../assets/secteurs', false, /\.png$/));
const evenementImages = importImages(require.context('../assets/evenements', false, /\.png$/));
const memoImages = importImages(require.context('../assets/memo', false, /\.png$/));


const Guide = () => {
  const [selectedCategory, setSelectedCategory] = useState('attaques');

  const getImagesByCategory = () => {
    switch (selectedCategory) {
      case 'attaques': return attaqueImages;
      case 'boucliers': return bouclierImages;
      case 'secteurs': return secteurImages;
      case 'evenements': return evenementImages;
      case 'memos': return memoImages;
      default: return {};
    }
  };

  return (
    <div className="guide-container">
      <h2 className="guide-title">Guide des cartes du jeu</h2>
      
      <div className="category-buttons">
        <button 
          className={selectedCategory === 'attaques' ? 'selected' : ''} 
          onClick={() => setSelectedCategory('attaques')}
        >
          Cartes Attaques
        </button>
        <button 
          className={selectedCategory === 'boucliers' ? 'selected' : ''} 
          onClick={() => setSelectedCategory('boucliers')}
        >
          Cartes Boucliers
        </button>
        <button 
          className={selectedCategory === 'secteurs' ? 'selected' : ''} 
          onClick={() => setSelectedCategory('secteurs')}
        >
          Cartes Secteurs
        </button>
        <button 
          className={selectedCategory === 'evenements' ? 'selected' : ''} 
          onClick={() => setSelectedCategory('evenements')}
        >
          Cartes Événements
        </button>
        <button 
          className={selectedCategory === 'memos' ? 'selected' : ''} 
          onClick={() => setSelectedCategory('memos')}
        >
          Cartes Memos
        </button>
      </div>

      <div className="cards-grid">
        {Object.values(getImagesByCategory()).map((img, index) => (
          <img key={index} src={img} alt={`Carte ${index}`} className="card-img" />
        ))}
      </div>
    </div>
  );
};

export default Guide;
