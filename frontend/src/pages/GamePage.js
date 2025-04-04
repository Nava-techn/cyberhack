import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GameTable from '../components/GameTable';
import './GamePage.css'; // Nous créerons ce fichier plus tard

const Game = () => {
  return (
    <div className="game-page">
      <Navbar /> 
      <GameTable />
      <Footer />
    </div>
  );
};

export default Game;