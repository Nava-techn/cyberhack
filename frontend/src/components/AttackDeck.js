import React, { useState, useRef, useEffect, useCallback } from 'react';
import './AttackDeck.css';

const AttackDeck = ({ onSelectAttacks, onStartGuessing }) => {
  const [showDeck, setShowDeck] = useState(false);
  const [selectedAttacks, setSelectedAttacks] = useState([]);
  const [attackDeck, setAttackDeck] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef(null);

  // Initialiser le deck au montage du composant
  useEffect(() => {
    const initializeDeck = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const deck = [];
        // Remplacez la boucle d'initialisation par :
for (let i = 1; i <= 15; i++) {
  try {
    deck.push({
      id: i,
      name: `Attaque ${i}`,
      image: require(`../assets/attaques/attaque-${i}-recto.png`), // Essaie de charger
      verso: require(`../assets/attaques/attaque-${i}-verso.png`),
      // ... autres propriétés
    });
  } catch (e) {
    console.warn(`Image manquante pour l'attaque ${i}`);
    deck.push({
      id: i,
      name: `Attaque ${i}`,
      image: require(`../assets/attaques/attaque-default.png`), // Image par défaut
      verso: require(`../assets/attaques/attaque-default-verso.png`),
      // ... autres propriétés
    });
  }
}
        
        setAttackDeck(deck.sort(() => Math.random() - 0.5));
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de l'initialisation du deck:", error);
        setIsLoading(false);
      }
    };

    initializeDeck();
  }, []);

  const closeModal = useCallback(() => {
    setShowDeck(false);
    if (selectedAttacks.length < 5) {
      setSelectedAttacks([]);
    }
  }, [selectedAttacks.length]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (showDeck) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDeck, closeModal]);

  const handleAttackClick = (attack) => {
    if (selectedAttacks.some(a => a.id === attack.id)) {
      setSelectedAttacks(selectedAttacks.filter(a => a.id !== attack.id));
    } else if (selectedAttacks.length < 5) {
      setSelectedAttacks([...selectedAttacks, attack]);
    }
  };

  const confirmSelection = () => {
    if (selectedAttacks.length === 5) {
      onSelectAttacks(selectedAttacks);
      closeModal();
      if (onStartGuessing) {
        onStartGuessing(selectedAttacks[0]);
      }
    }
  };

  const getCardStyle = (attack) => {
    const isSelected = selectedAttacks.some(a => a.id === attack.id);
    return {
      transform: isSelected ? 'translateY(-10px)' : 'none',
      boxShadow: isSelected ? '0 0 15px gold' : 'none'
    };
  };

  return (
    <>
      <div 
        className={`deck-label ${isLoading ? 'loading' : ''}`} 
        onClick={() => !isLoading && setShowDeck(true)}
      >
        {isLoading ? 'Chargement...' : 'Cartes Attaques'}
      </div>

      {showDeck && (
        <>
          <div className="modal-overlay" onClick={closeModal} />
          <div className="card-selection-modal" ref={modalRef}>
            <h2>Sélectionnez 5 cartes d'attaque</h2>
            <div className="selection-info">
              {selectedAttacks.length}/5 sélectionnées
              {selectedAttacks.length < 5 && (
                <span className="hint">(Cliquez sur une carte pour la sélectionner)</span>
              )}
            </div>
            
            {isLoading ? (
              <div className="loading-spinner">Chargement des cartes...</div>
            ) : (
              <>
                <div className="card-grid">
                  {attackDeck.slice(0, 15).map((attack) => (
                    <div
                      key={attack.id}
                      className={`card-item ${
                        selectedAttacks.some(a => a.id === attack.id) ? 'selected' : ''
                      }`}
                      onClick={() => handleAttackClick(attack)}
                      style={getCardStyle(attack)}
                    >
                      <div className="card-inner">
                        <div className="card-front">
                          <img 
                            src={attack.image} 
                            alt={`${attack.name} recto`} 
                            title={attack.name}
                          />
                        </div>
                        <div className="card-back">
                          <img 
                            src={attack.verso} 
                            alt={`${attack.name} verso`} 
                          />
                        </div>
                      </div>
                      <div className="card-badge">
                        {selectedAttacks.findIndex(a => a.id === attack.id) + 1}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="cancel-btn"
                    onClick={closeModal}
                  >
                    Annuler
                  </button>
                  <button 
                    className="confirm-btn"
                    onClick={confirmSelection}
                    disabled={selectedAttacks.length !== 5}
                  >
                    Valider ({selectedAttacks.length}/5)
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AttackDeck;