import React, { useState } from 'react';
import './AttackPhase.css';

const AttackPhase = ({ 
  selectedSector,
  diceValue,
  shieldValue,
  onAttackResult,
  onRequestRollDice,
  isSpecialShield
}) => {
  const [attackState, setAttackState] = useState('initial'); // initial, rolling, result

  const handleAttack = () => {
    setAttackState('rolling');
    onRequestRollDice();
  };

  const renderAttackResult = () => {
    if (!diceValue) return null;

    const isSuccess = diceValue >= shieldValue;
    return (
      <div className={`attack-result ${isSuccess ? 'success' : 'failure'}`}>
        <h3>{isSuccess ? 'Attaque réussie!' : 'Attaque échouée!'}</h3>
        <p>Valeur du dé: {diceValue}</p>
        <p>Valeur du bouclier: {shieldValue}</p>
        {isSuccess && isSpecialShield && (
          <p className="special-message">
            Bouclier spécial détruit! Piochez une carte événement!
          </p>
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