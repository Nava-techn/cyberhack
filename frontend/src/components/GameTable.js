import React, { useState, useRef, useCallback } from 'react';
import Dice from './Dice';
import Hourglass from './Hourglass';
import SectorDeck from './SectorDeck';
import ShieldDeck from './ShieldDeck';
import AttackDeck from './AttackDeck';
import AttackPhase from './AttackPhase';
import GuessAttack from './GuessAttack';
import './GameTable.css';

const GameTable = () => {
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedShields, setSelectedShields] = useState([]);
  const [selectedAttacks, setSelectedAttacks] = useState([]);
  const [attackingPhase, setAttackingPhase] = useState(false);
  const [selectedSectorForAttack, setSelectedSectorForAttack] = useState(null);
  const [diceValue, setDiceValue] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [waitingForDiceRoll, setWaitingForDiceRoll] = useState(false);
  const [isGuessing, setIsGuessing] = useState(false);
  const [currentAttackCard, setCurrentAttackCard] = useState(null);
  const hourglassRef = useRef(null);
  const [guessFailures, setGuessFailures] = useState(0);  // Nombre d'échecs
  const [guessAttempts, setGuessAttempts] = useState(0);  // Tentatives restantes

  const getShieldImage = (type, value) => {
    try {
      return require(`../assets/boucliers/bouclier-${value}-${type}.png`);
    } catch {
      return require('../assets/boucliers/bouclier-default.png');
    }
  };

  const getShieldVerso = () => {
    return require('../assets/boucliers/bouclier-verso.png');
  };

  const handleSectorSelection = useCallback((sectors) => {
    setSelectedSectors(sectors);
  }, []);

  const handleShieldSelection = useCallback((shieldPockets) => {
    // Trier chaque poche de boucliers du plus grand au plus petit
    const sortedShields = shieldPockets.map(pocket =>
      pocket.sort((a, b) => b.value - a.value)
    );
    setSelectedShields(sortedShields);
  }, []);

  const handleAttackSelection = useCallback((attacks) => {
    setSelectedAttacks(attacks);
  }, []);

  const handleSectorClick = useCallback((sectorIndex) => {
    if (isGuessing) {
      alert("Vous devez d'abord deviner l'attaque avant de pouvoir attaquer les secteurs!");
      return;  // Ne pas permettre de sélectionner un secteur si on est en train de deviner
    }

    if (!isGuessing && selectedShields[sectorIndex]?.length > 0 && selectedAttacks.length > 0) {
      setSelectedSectorForAttack(sectorIndex);
      setAttackingPhase(true);
      setWaitingForDiceRoll(true);
    } else if (selectedAttacks.length === 0) {
      alert("Il n'y a plus de cartes d'attaque disponibles!");
    } else if (isGuessing) {
      alert("Vous devez d'abord deviner l'attaque!");
    } else {
      alert("Ce secteur n'a plus de boucliers à attaquer!");
    }
  }, [selectedShields, selectedAttacks, isGuessing]);

  const handleDiceRoll = useCallback((value) => {
    if (waitingForDiceRoll) {
      setDiceValue(value);
      setWaitingForDiceRoll(false);
    }
  }, [waitingForDiceRoll]);

  const handleAttackResult = useCallback((isSuccess, eventCard) => {
    const newShields = [...selectedShields];

    if (isSuccess) {
      newShields[selectedSectorForAttack]?.shift();

      if (eventCard && newShields[selectedSectorForAttack]?.length > 0) {
        newShields[selectedSectorForAttack]?.shift();
      }

      if (newShields[selectedSectorForAttack]?.length === 0) {
        if (newShields.every(pocket => pocket.length === 0)) {
          setGameWon(true);
        }
      }
    }

    const newAttacks = [...selectedAttacks];
    newAttacks.shift();

    setSelectedAttacks(newAttacks);
    setSelectedShields(newShields);
    setAttackingPhase(false);
    setSelectedSectorForAttack(null);
    setDiceValue(null);
    setWaitingForDiceRoll(false);
  }, [selectedShields, selectedAttacks, selectedSectorForAttack]);

  const handleAttackCardClick = useCallback(() => {
    if (selectedAttacks.length > 0 && !isGuessing) {
      const currentCard = selectedAttacks[0];
      const otherAttacks = selectedAttacks.slice(1, 3).map(a => a.name);

      while (otherAttacks.length < 2) {
        otherAttacks.push(`Attaque ${Math.floor(Math.random() * 15) + 1}`);
      }

      const completeCard = {
        ...currentCard,
        propositions: [currentCard.name, ...otherAttacks].sort(() => Math.random() - 0.5),
        correctName: currentCard.name,
        description: currentCard.description || `Cette attaque est efficace contre les boucliers de type ${currentCard.effectiveAgainst || 'tous types'}`
      };

      setCurrentAttackCard(completeCard);
      setIsGuessing(true);
      hourglassRef.current?.startTimer();
    }
  }, [selectedAttacks, isGuessing]);

  const handleGuessComplete = useCallback((success) => {
    const newAttacks = [...selectedAttacks];
    const wasLastCard = newAttacks.length === 1;

    newAttacks.shift();
    setSelectedAttacks(newAttacks);
    setCurrentAttackCard(null);

    if (success) {
      setGuessAttempts(0);  // Réinitialiser le compteur si la devinette est correcte
      setIsGuessing(false);
    } else {
      const newFailures = guessFailures + 1;
      setGuessFailures(newFailures);
      setGuessAttempts((prevAttempts) => prevAttempts + 1);  // Incrémenter les tentatives échouées
      setIsGuessing(false);

      if (newFailures >= 5 || wasLastCard) {
        setGameLost(true);  // Si 5 échecs ou dernière carte, la défaite
      }
    }
  }, [selectedAttacks, guessFailures]);

  if (gameWon) {
    return (
      <div className="game-end-screen victory">
        <h1>Victoire!</h1>
        <p>Vous avez détruit tous les secteurs ennemis!</p>
      </div>
    );
  }

  if (gameLost) {
    return (
      <div className="game-end-screen defeat">
        <h1>Défaite</h1>
        <p>Vous avez échoué à deviner l'attaque après 5 tentatives.</p>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="cards-zone">
        <SectorDeck onSelectSectors={handleSectorSelection} />
        <AttackDeck
          onSelectAttacks={handleAttackSelection}
          onStartGuessing={handleAttackCardClick}
        />
        <ShieldDeck onSelectShields={handleShieldSelection} />
      </div>

      <div className="game-table">
        <Dice onRoll={handleDiceRoll} isEnabled={waitingForDiceRoll} />
        <Hourglass ref={hourglassRef} />

        <div className="selected-attacks" onClick={handleAttackCardClick}>
          {selectedAttacks.sort((a, b) => b.value - a.value).map((attack, index) => (
            <div key={index} className="attack-card stacked">
              <div className="attack-card-inner">
                <div className="attack-card-front">
                  <img
                    src={attack.image}
                    alt={`Attaque ${attack.name || index + 1}`}
                    onError={(e) => {
                      e.target.src = require('../assets/attaques/attaque-default.png');
                    }}
                  />
                </div>
                <div className="attack-card-back">
                  <img
                    src={attack.verso}
                    alt="Verso de carte attaque"
                    onError={(e) => {
                      e.target.src = require('../assets/attaques/attaque-default-verso.png');
                    }}
                  />
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
                className={`sector-card-on-table ${selectedShields[index]?.length ? 'active' : 'inactive'} ${isGuessing ? 'disabled' : ''}`}
                onClick={() => !isGuessing && handleSectorClick(index)}
                style={{
                  '--recto': `url(${sector})`,
                  '--verso': `url(${sector.replace('recto', 'verso')})`
                }}
              >
                <img
                  src={sector}
                  alt={`Secteur ${index + 1}`}
                  onError={(e) => {
                    e.target.src = require('../assets/secteurs/secteur-default.png');
                  }}
                />
              </div>
            ))}
          </div>

          <div className="shield-pockets-row">
            {selectedShields.map((pocket, pocketIndex) => (
              <div key={pocketIndex} className="shield-pocket">
                {pocket.map((shield, shieldIndex) => (
                  <div
                    key={shieldIndex}
                    className="shield-card-on-table"
                    style={{
                      '--recto': `url(${getShieldImage(shield?.type, shield?.value)})`,
                      '--verso': `url(${getShieldVerso()})`
                    }}
                  >
                    <img
                      src={getShieldImage(shield?.type, shield?.value)}
                      alt={`Bouclier ${shield?.type} ${shield?.value}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {attackingPhase && (
        <AttackPhase
          selectedSector={selectedSectorForAttack}
          diceValue={diceValue}
          shieldValue={selectedShields[selectedSectorForAttack]?.[0]?.value || 0}
          onAttackResult={handleAttackResult}
          onRequestRollDice={() => setWaitingForDiceRoll(true)}
          isSpecialShield={selectedShields[selectedSectorForAttack]?.[0]?.type === 'dark'}
        />
      )}

      {isGuessing && currentAttackCard && (
        <GuessAttack
          attackCard={currentAttackCard}
          onGuessComplete={handleGuessComplete}
          attemptsLeft={1} // Toujours 1 essai maintenant
        />
      )}
    </div>
  );
};

export default GameTable;
