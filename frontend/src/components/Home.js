import React, {  } from 'react';
import {  } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Cyber@Hack</h1>
       <a href="/game"><button className="start-button">Commencer une nouvelle partie</button></a>
      </div>
    </div>
  );
};
export default Home;