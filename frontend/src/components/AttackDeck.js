import React, { useState, useRef, useEffect } from 'react';
import './AttackDeck.css';

const AttackDeck = ({ onSelectAttacks }) => {
  const [showDeck, setShowDeck] = useState(false);
  const [selectedAttacks, setSelectedAttacks] = useState([]);
  const modalRef = useRef(null);

  // Ajouter la gestion du clic extérieur
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

  // Créer le deck de cartes d'attaque
  const createAttackDeck = () => {
    let deck = [];
    // Créer 15 cartes d'attaque (ajustez le nombre selon vos besoins)
    for (let i = 1; i <= 10; i++) {
      deck.push({
        id: i,
        image: require(`../assets/attaques/attaque-${i}-recto.png`),
        verso: require(`../assets/attaques/attaque-${i}-verso.png`)
      });
    }
    // Mélanger le deck
    return deck.sort(() => Math.random() - 0.5);
  };

  const [attackDeck] = useState(createAttackDeck());

  const handleAttackClick = (index) => {
    if (selectedAttacks.length < 5) {
      setSelectedAttacks([...selectedAttacks, attackDeck[index]]);
    }
  };

  const confirmSelection = () => {
    if (selectedAttacks.length === 5) {
      onSelectAttacks(selectedAttacks);
      setShowDeck(false);
    }
  };

  return (
    <>
      <div className="deck-label" onClick={() => setShowDeck(true)}>
        Cartes Attaques
      </div>

      {showDeck && (
        <>
          <div className="modal-overlay" />
          <div className="card-selection-modal" ref={modalRef}>
            <div className="selection-info">
              Sélectionnez 5 cartes d'attaque ({selectedAttacks.length}/5)
            </div>
            
            <div className="card-grid">
              {attackDeck.slice(0, 15).map((attack, index) => (
                <div
                  key={index}
                  className={`card-item ${
                    selectedAttacks.includes(attack) ? 'selected' : ''
                  }`}
                  onClick={() => handleAttackClick(index)}
                >
                  <div className="card-inner">
                    <div className="card-front">
                      <img src={attack.image} alt={`Attaque ${index + 1} recto`} />
                    </div>
                    <div className="card-back">
                      <img src={attack.verso} alt={`Attaque ${index + 1} verso`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="confirm-btn"
              onClick={confirmSelection}
              disabled={selectedAttacks.length !== 5}
            >
              Valider la sélection
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AttackDeck; 