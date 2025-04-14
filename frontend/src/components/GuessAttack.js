import React, { useState, useEffect, useCallback } from 'react';
import './GuessAttack.css';

const GuessAttack = ({ attackCard, onGuessComplete }) => {
  // Valeurs par défaut pour éviter les undefined
  const safeAttackCard = attackCard || {
    name: 'Attaque inconnue',
    description: 'Description non disponible',
    propositions: ['Option 1', 'Option 2', 'Option 3'],
    correctName: 'Option 1',
    secteur_cible: 'Inconnu',
    image: '' // Vous pouvez mettre une image par défaut ici
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  
  const handleGuessComplete = useCallback((isCorrect) => {
    setTimeout(() => {
      onGuessComplete(isCorrect);
    }, 500);
  }, [onGuessComplete]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleGuessComplete(false);
    }
  }, [timeLeft, handleGuessComplete]);

  const handlePropositionClick = (proposition) => {
    if (selectedAnswer) return; // Empêche de changer la réponse
    setSelectedAnswer(proposition);
    const isCorrect = proposition === safeAttackCard.correctName;
    handleGuessComplete(isCorrect);
  };

  return (
    <div className="guess-attack-container">
      <div className="timer">Temps restant : {timeLeft}s</div>
      
      <div className="attack-card-display">
        {safeAttackCard.image && (
          <img src={safeAttackCard.image} alt={`Attaque ${safeAttackCard.name}`} />
        )}
      </div>
      
      <div className="description-container">
        <h3>Description de l'attaque :</h3>
        <p>{safeAttackCard.description}</p>
        <p className="secteur-cible">Secteur cible : {safeAttackCard.secteur_cible}</p>
      </div>
      
      <div className="propositions-container">
        <h3>Devinez le nom de cette attaque :</h3>
        <div className="propositions">
          {safeAttackCard.propositions.map((proposition, index) => (
            <button
              key={index}
              onClick={() => handlePropositionClick(proposition)}
              className={`proposition-btn ${
                selectedAnswer === proposition ? 'selected' : ''
              }`}
              disabled={!!selectedAnswer}
            >
              {proposition}
            </button>
          ))}
        </div>
      </div>

      {selectedAnswer && (
        <div className={`result ${
          selectedAnswer === safeAttackCard.correctName ? 'success' : 'failure'
        }`}>
          {selectedAnswer === safeAttackCard.correctName ? 'Correct !' : 'Incorrect !'}
        </div>
      )}
    </div>
  );
};

export default GuessAttack;