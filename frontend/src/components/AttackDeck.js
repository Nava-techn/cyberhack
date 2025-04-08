import React, { useState, useRef, useEffect } from 'react';
import './AttackDeck.css';

const AttackDeck = ({ onSelectAttacks }) => {
  const [showDeck, setShowDeck] = useState(false);
  const [selectedAttacks, setSelectedAttacks] = useState([]);
  const [isGuessing, setIsGuessing] = useState(false);
  const [guessData, setGuessData] = useState(null);
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
      handleAttackGuess(attackDeck[index].id);
    }
  };

  const confirmSelection = () => {
    if (selectedAttacks.length === 5) {
      onSelectAttacks(selectedAttacks);
      setShowDeck(false);
    }
  };

  const handleAttackGuess = async (attackId) => {
    console.log('Tentative de devinette pour l\'attaque:', attackId);
    try {
      const response = await fetch(`http://localhost:8000/api/attaque/${attackId}`);
      console.log('Réponse reçue:', response);
      const data = await response.json();
      console.log('Données reçues:', data);
      setGuessData(data);
      setIsGuessing(true);
    } catch (error) {
      console.error('Erreur détaillée:', error);
    }
  };

  const handleGuessComplete = (selectedProposition) => {
    const isCorrect = selectedProposition === guessData.nomCorrect;
    setIsGuessing(false);
    setGuessData(null);
    console.log('Réponse correcte:', isCorrect);
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

            {isGuessing && guessData && (
              <div className="guess-modal">
                <div className="guess-content">
                  <h3>Devinez l'attaque !</h3>
                  <p>{guessData.description}</p>
                  <div className="propositions">
                    {guessData.propositions.map((proposition, index) => (
                      <button
                        key={index}
                        onClick={() => handleGuessComplete(proposition)}
                        className="proposition-btn"
                      >
                        {proposition}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
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