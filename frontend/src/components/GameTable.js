import React, { useState } from 'react';
import Dice from './Dice';
import Hourglass from './Hourglass';
import SectorDeck from './SectorDeck';
import ShieldDeck from './ShieldDeck';
import AttackDeck from './AttackDeck';
import AttackPhase from './AttackPhase';
import './GameTable.css';

const GameTable = () => {
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedShields, setSelectedShields] = useState([]);
  const [selectedAttacks, setSelectedAttacks] = useState([]);
  const [attackingPhase, setAttackingPhase] = useState(false);
  const [selectedSectorForAttack, setSelectedSectorForAttack] = useState(null);
  const [diceValue, setDiceValue] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [waitingForDiceRoll, setWaitingForDiceRoll] = useState(false);

  const getShieldImage = (type, value) => {
    return require(`../assets/boucliers/bouclier-${value}-${type}.png`);
  };

  const getShieldVerso = () => {
    return require('../assets/boucliers/bouclier-verso.png');
  };

  const handleSectorSelection = (sectors) => {
    setSelectedSectors(sectors);
  };

  const handleShieldSelection = (shieldPockets) => {
    console.log('Shield pockets received:', shieldPockets);
    setSelectedShields(shieldPockets);
  };

  const handleAttackSelection = (attacks) => {
    console.log('Attack cards received:', attacks);
    setSelectedAttacks(attacks);
  };

  const handleSectorClick = (sectorIndex) => {
    if (selectedShields[sectorIndex].length > 0 && selectedAttacks.length > 0) {
      setSelectedSectorForAttack(sectorIndex);
      setAttackingPhase(true);
      setWaitingForDiceRoll(true);
    } else if (selectedAttacks.length === 0) {
      alert("Il n'y a plus de cartes d'attaque disponibles!");
    } else {
      alert("Ce secteur n'a plus de boucliers à attaquer!");
    }
  };

  const handleDiceRoll = (value) => {
    if (!waitingForDiceRoll) return;
    
    setDiceValue(value);
    setWaitingForDiceRoll(false);
  };

  const handleAttackResult = (isSuccess) => {
    const newShields = [...selectedShields];
    
    if (isSuccess) {
      // Retirer le bouclier de la pochette
      newShields[selectedSectorForAttack].shift();
      
      // Vérifier si le secteur est détruit
      if (newShields[selectedSectorForAttack].length === 0) {
        // Vérifier si c'est le dernier secteur avec des boucliers
        const remainingShields = newShields.some(pocket => pocket.length > 0);
        if (!remainingShields) {
          setGameWon(true);
        }
      }
    }

    // Retirer la carte d'attaque utilisée
    const newAttacks = [...selectedAttacks];
    newAttacks.shift();
    setSelectedAttacks(newAttacks);
    
    setSelectedShields(newShields);
    setAttackingPhase(false);
    setSelectedSectorForAttack(null);
    setDiceValue(null);
    setWaitingForDiceRoll(false);
  };

  if (gameWon) {
    return (
      <div className="game-won">
        <h1>Victoire!</h1>
        <p>Les pirates ont réussi à détruire tous les secteurs!</p>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="cards-zone">
        <SectorDeck onSelectSectors={handleSectorSelection} />
        <AttackDeck onSelectAttacks={handleAttackSelection} /> 
        <ShieldDeck onSelectShields={handleShieldSelection} />
      </div>
      <div className="game-table">
        <Dice onRoll={handleDiceRoll} isEnabled={waitingForDiceRoll} />
        <Hourglass />
        
        {/* Zone des cartes d'attaque */}
        <div className="selected-attacks">
          {selectedAttacks.map((attack, index) => (
            <div 
              key={index}
              className="attack-card stacked"
            >
              <div className="attack-card-inner">
                <div className="attack-card-front">
                  <img src={attack.image} alt={`Attaque ${index + 1} recto`} />
                </div>
                <div className="attack-card-back">
                  <img src={attack.verso} alt={`Attaque ${index + 1} verso`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="selected-cards-area">
          <div className="selected-sectors-row">
            {selectedSectors.map((sector, index) => (
              <div 
                key={index} 
                className="sector-card-on-table"
                onClick={() => handleSectorClick(index)}
                style={{
                  '--recto': `url(${sector})`,
                  '--verso': `url(${sector.replace('recto', 'verso')})`,
                  cursor: 'pointer'
                }}
              >
                <img src={sector} alt={`Secteur ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="shield-pockets-row">
            {selectedShields.map((pocket, pocketIndex) => (
              <div key={pocketIndex} className="shield-pocket">
                {pocket.map((shield, shieldIndex) => {
                  const shieldImage = getShieldImage(shield.type, shield.value);
                  const versoImage = getShieldVerso();
                  return (
                    <div 
                      key={shieldIndex}
                      className="shield-card-on-table"
                      style={{
                        '--recto': `url(${shieldImage})`,
                        '--verso': `url(${versoImage})`
                      }}
                    >
                      <img 
                        src={shieldImage}
                        alt={`Bouclier ${shield.type} ${shield.value}`} 
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {attackingPhase && selectedSectorForAttack !== null && (
        <AttackPhase
          selectedSector={selectedSectorForAttack}
          diceValue={diceValue}
          shieldValue={selectedShields[selectedSectorForAttack][0].value}
          onAttackResult={handleAttackResult}
          onRequestRollDice={() => setWaitingForDiceRoll(true)}
          isSpecialShield={selectedShields[selectedSectorForAttack][0].type === 'dark'}
        />
      )}
    </div>
  );
};

export default GameTable;