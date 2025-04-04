import React, { useState, useEffect } from 'react';
import './Hourglass.css';

const Hourglass = () => {
  const [isFlowing, setIsFlowing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [sandHeight, setSandHeight] = useState(100);

  const handleClick = () => {
    if (!isFlowing && !isRotating) {
      setIsFlowing(true);
      setSandHeight(100); // Réinitialiser à plein
    }
  };

  useEffect(() => {
    if (isFlowing) {
      const interval = setInterval(() => {
        setSandHeight(prev => {
          if (prev > 0) {
            return prev - 10; // Diminue de 10% chaque seconde
          } else {
            clearInterval(interval);
            setIsFlowing(false);
            setIsRotating(true);
            setTimeout(() => {
              setIsRotating(false);
              setSandHeight(100); // Remplit à nouveau après rotation
            }, 1000); // Durée de la rotation
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isFlowing]);

  return (
    <div 
      className={`hourglass ${isRotating ? 'rotating' : ''}`} 
      onClick={handleClick}
    >
      <div className="glass">
        <div className="sand" style={{ height: `${sandHeight}%` }}></div>
      </div>
      <div className="stand"></div>
    </div>
  );
};

export default Hourglass;