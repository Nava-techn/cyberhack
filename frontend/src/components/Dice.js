import React, { useState } from 'react';
import './Dice.css';

const Dice = ({ onRoll, isEnabled = true }) => {
  const [rolling, setRolling] = useState(false);
  const [value, setValue] = useState(1);

  const rollDice = () => {
    if (rolling || !isEnabled) return;
    
    setRolling(true);
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setValue(newValue);
      setRolling(false);
      if (onRoll) {
        onRoll(newValue);
      }
    }, 1000);
  };

  return (
    <div 
      className={`dice ${rolling ? 'rolling' : ''} ${isEnabled ? 'enabled' : 'disabled'}`} 
      onClick={rollDice}
      data-value={value}
    >
      <div className="face front" data-value="1"></div>
      <div className="face back" data-value="2"></div>
      <div className="face right" data-value="3"></div>
      <div className="face left" data-value="4"></div>
      <div className="face top" data-value="5"></div>
      <div className="face bottom" data-value="6"></div>
    </div>
  );
};

export default Dice;