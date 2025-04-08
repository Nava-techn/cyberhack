// src/pages/GuidePage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Guide from '../components/Guide'; // Ton composant Guide existant
import './GuidePage.css';

const GuidePage = () => {
  return (
    <div className="guide-page">
      <Navbar />
      <Guide />
      <Footer />
    </div>
  );
};

export default GuidePage;
