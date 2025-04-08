import React, { useState, useEffect } from 'react';
import './GuessAttack.css';

const GuessAttack = ({ attackCard, onGuessComplete }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Le temps est écoulé
      handleTimeUp();
    }
  }, [timeLeft]);
  
  const handleTimeUp = () => {
    // Le temps est écoulé, considérer comme échec si aucune réponse n'a été sélectionnée
    if (selectedAnswer === null) {
      onGuessComplete(false);
    }
  };
  
  const handlePropositionClick = (proposition) => {
    setSelectedAnswer(proposition);
    const isCorrect = proposition === attackCard.nom;
    
    setTimeout(() => {
      onGuessComplete(isCorrect);
    }, 500);
  };

  return (
    <div className="guess-attack-container">
      <div className="timer">Temps restant : {timeLeft}s</div>
      
      <div className="attack-card-display">
        <img src={attackCard.image} alt={`Attaque ${attackCard.nom}`} />
      </div>
      
      <div className="description-container">
        <h3>Description de l'attaque :</h3>
        <p>{attackCard.description || "Chargement..."}</p>
        <p className="secteur-cible">Secteur cible : {attackCard.secteur_cible}</p>
      </div>
      
      {attackCard.propositions && (
        <div className="propositions-container">
          <h3>Devinez le nom de cette attaque :</h3>
          <div className="propositions">
            {attackCard.propositions.map((proposition, index) => (
              <button
                key={index}
                onClick={() => handlePropositionClick(proposition)}
                className={`proposition-btn ${
                  selectedAnswer === proposition ? 'selected' : ''
                }`}
              >
                {proposition}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuessAttack;