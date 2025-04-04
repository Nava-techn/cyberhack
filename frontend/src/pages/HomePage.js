import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../components/Home';




import './HomePage.css'; // Nous créerons ce fichier plus tard

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default HomePage;