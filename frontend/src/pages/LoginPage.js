import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Login from '../components/Login';
import './LoginPage.css'; // Nous créerons ce fichier plus tard

const LoginPage = () => {
  return (
    <div className="login-page">
      <Navbar />
      <Login />
      <Footer />
    </div>
  );
};

export default LoginPage;