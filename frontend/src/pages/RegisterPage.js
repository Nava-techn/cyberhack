import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Register from '../components/Register';
import './RegisterPage.css'; // Nous créerons ce fichier plus tard

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Navbar />
      <Register />
      <Footer />
    </div>
  );
};

export default RegisterPage;