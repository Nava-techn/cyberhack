// src/components/AttackPhase.js

import React, { useState, useEffect } from 'react';
import './AttackPhase.css';
import { fetchRandomEventCard } from '../services/eventCardService';

const AttackPhase = ({
  selectedSector,
  diceValue,
  shieldValue,
  onAttackResult,
  onRequestRollDice,
  isSpecialShield
}) => {
  const [attackState, setAttackState] = useState('initial');
  const [eventCard, setEventCard] = useState(null);

  const handleAttack = () => {
    setAttackState('rolling');
    onRequestRollDice();
  };

  useEffect(() => {
    const fetchEventCard = async () => {
      if (isSpecialShield && diceValue >= shieldValue) {
        const card = await fetchRandomEventCard();
        setEventCard(card);
      }
    };

    fetchEventCard();
  }, [diceValue, shieldValue, isSpecialShield]);

  const renderAttackResult = () => {
    if (!diceValue) return null;

    const isSuccess = diceValue >= shieldValue;
    return (
      <div className={`attack-result ${isSuccess ? 'success' : 'failure'}`}>
        <h3>{isSuccess ? 'Attaque réussie!' : 'Attaque échouée!'}</h3>
        <p>Valeur du dé: {diceValue}</p>
        <p>Valeur du bouclier: {shieldValue}</p>
        {isSuccess && isSpecialShield && eventCard && (
          <div className="event-card">
           <img src={`http://127.0.0.1:8000${eventCard.imageUrl}`} alt={eventCard.name} />

           
          </div>
        )}
        <button
          onClick={() => onAttackResult(isSuccess)}
          className="confirm-btn"
        >
          Continuer
        </button>
      </div>
    );
  };

  return (
    <div className="attack-phase">
      {attackState === 'initial' && (
        <div className="attack-prompt">
          <h3>Phase d'attaque</h3>
          <p>Secteur sélectionné: {selectedSector + 1}</p>
          <button onClick={handleAttack} className="attack-btn">
            Lancer le dé
          </button>
        </div>
      )}
      {attackState === 'rolling' && renderAttackResult()}
    </div>
  );
};

export default AttackPhase;
