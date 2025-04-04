import React, { useState, useEffect, useRef } from 'react';
import './SectorDeck.css';

const SectorDeck = ({ onSelectSectors }) => {
  const [showDeck, setShowDeck] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const modalRef = useRef(null);

  // Importer les 10 cartes secteur (recto/verso)
  const sectorCards = Array.from({ length: 10 }, (_, i) => ({
    recto: require(`../assets/secteurs/secteur_${i+1}_recto.png`),
    verso: require(`../assets/secteurs/secteur_${i+1}_verso.png`)
  }));

  // Fermer le deck quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowDeck(false);
      }
    };

    if (showDeck) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDeck]);

  const handleDeckClick = () => {
    setShowDeck(true);
    setSelectedCards([]);
  };

  const handleCardClick = (index) => {
    const newSelection = [...selectedCards];
    const cardIndex = newSelection.findIndex(card => card.index === index);

    if (cardIndex >= 0) {
      newSelection.splice(cardIndex, 1);
    } else if (newSelection.length < 5) {
      newSelection.push({
        index,
        side: newSelection.length % 2 === 0 ? 'recto' : 'verso'
      });
    }

    setSelectedCards(newSelection);
  };

  // Fonction pour définir le style CSS personnalisé pour le verso de la carte
  const getCardStyle = (index) => {
    const card = sectorCards[index];
    return {
      '--verso': `url(${card.verso})`
    };
  };

  const confirmSelection = () => {
    const selectedSectors = selectedCards.map(card => 
      sectorCards[card.index][card.side]
    );
    onSelectSectors(selectedSectors);
    setShowDeck(false);
  };

  return (
    <>
      <div className="deck-label" onClick={handleDeckClick}>
        Cartes Secteurs
      </div>

      {showDeck && (
        <div 
          className="card-selection-modal"
          ref={modalRef}
        >
          <div className="card-grid">
            {sectorCards.map((card, index) => (
              <div
                key={index}
                className={`card-item ${
                  selectedCards.some(c => c.index === index) ? 'selected' : ''
                }`}
                onClick={() => handleCardClick(index)}
                style={getCardStyle(index)}
              >
                <img
                  src={card.recto}
                  alt={`Secteur ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <button 
            className="confirm-btn"
            onClick={confirmSelection}
            disabled={selectedCards.length !== 5}
          >
            Valider 5 cartes
          </button>
        </div>
      )}
    </>
  );
};

export default SectorDeck;