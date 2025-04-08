// src/pages/ReglesPage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Regles from '../components/Regles';
import './ReglesPage.css';

const ReglesPage = () => {
  return (
    <div className="regles-page">
      <Navbar />
      <Regles />
      <Footer />
    </div>
  );
};

export default ReglesPage;
