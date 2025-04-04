import React, { useState, useEffect, useRef } from 'react';
import './ShieldDeck.css';

const ShieldDeck = ({ onSelectShields }) => {
  const [showDeck, setShowDeck] = useState(false);
  const [selectedShields, setSelectedShields] = useState(Array(5).fill([])); // 5 pochettes vides
  const [currentPocket, setCurrentPocket] = useState(0); // Poche actuelle (0-4)
  const modalRef = useRef(null);

  // Créer les 6 types de boucliers (light et dark)
  const shieldTypes = Array.from({ length: 6 }, (_, i) => ({
    light: require(`../assets/boucliers/bouclier-${i+1}-light.png`),
    dark: require(`../assets/boucliers/bouclier-${i+1}-dark.png`),
    verso: require('../assets/boucliers/bouclier-verso.png'),
    value: i + 1 // Valeur pour la comparaison avec le dé
  }));

  // Créer le deck de 40 cartes bouclier aléatoires
  const createShieldDeck = () => {
    let deck = [];
    // Créer 20 cartes light et 20 cartes dark
    for (let i = 0; i < 20; i++) {
      const randomType = Math.floor(Math.random() * 6);
      deck.push({ ...shieldTypes[randomType], type: 'light' });
    }
    for (let i = 0; i < 20; i++) {
      const randomType = Math.floor(Math.random() * 6);
      deck.push({ ...shieldTypes[randomType], type: 'dark' });
    }
    // Mélanger le deck
    return deck.sort(() => Math.random() - 0.5);
  };

  const [shieldDeck] = useState(createShieldDeck());

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
    setSelectedShields(Array(5).fill([]));
    setCurrentPocket(0);
  };

  const handleShieldClick = (index) => {
    const newSelection = [...selectedShields];
    const currentPocketShields = [...newSelection[currentPocket]];
    
    // Vérifier si la carte est déjà sélectionnée dans la poche actuelle
    const shieldIndex = currentPocketShields.findIndex(shield => shield.index === index);
    
    if (shieldIndex >= 0) {
      // Retirer la carte de la poche actuelle
      currentPocketShields.splice(shieldIndex, 1);
    } else if (currentPocketShields.length < 1) {
      // Ajouter la carte à la poche actuelle si elle est vide
      currentPocketShields.push({
        index,
        type: shieldDeck[index].type,
        value: shieldDeck[index].value
      });
    }
    
    newSelection[currentPocket] = currentPocketShields;
    setSelectedShields(newSelection);
  };

  const handlePocketChange = (pocketIndex) => {
    setCurrentPocket(pocketIndex);
  };

  const isShieldSelected = (index) => {
    return selectedShields.some(pocket => 
      pocket.some(shield => shield.index === index)
    );
  };

  // Fonction pour définir le style CSS personnalisé pour le verso de la carte
  const getShieldStyle = (index) => {
    const shield = shieldDeck[index];
    return {
      '--verso': `url(${shield.verso})`
    };
  };

  const confirmSelection = () => {
    // Vérifier que toutes les pochettes ont une carte
    const allPocketsFull = selectedShields.every(pocket => pocket.length === 1);
    if (allPocketsFull) {
      onSelectShields(selectedShields);
      setShowDeck(false);
    }
  };

  return (
    <>
      <div className="deck-label" onClick={handleDeckClick}>
        Cartes Boucliers
      </div>

      {showDeck && (
        <div 
          className="card-selection-modal"
          ref={modalRef}
        >
          <div className="pockets-selector">
            {selectedShields.map((pocket, index) => (
              <button
                key={index}
                className={`pocket-btn ${currentPocket === index ? 'active' : ''}`}
                onClick={() => handlePocketChange(index)}
              >
                Poche {index + 1} ({pocket.length}/1)
              </button>
            ))}
          </div>
          
          <div className="card-grid">
            {shieldDeck.slice(0, 15).map((shield, index) => (
              <div
                key={index}
                className={`card-item ${
                  isShieldSelected(index) ? 'selected' : ''
                }`}
                onClick={() => handleShieldClick(index)}
                style={getShieldStyle(index)}
              >
                <img
                  src={shield[shield.type]}
                  alt={`Bouclier ${shield.type} ${shield.value}`}
                />
              </div>
            ))}
          </div>
          
          <button 
            className="confirm-btn"
            onClick={confirmSelection}
            disabled={!selectedShields.every(pocket => pocket.length === 1)}
          >
            Valider les 5 pochettes
          </button>
        </div>
      )}
    </>
  );
};

export default ShieldDeck; 