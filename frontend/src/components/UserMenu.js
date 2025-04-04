import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './UserMenu.css'; // Nous créerons ce fichier plus tard

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="user-menu">
      <button className="user-button" onClick={toggleMenu}>
        {user.pseudo}
      </button>
      {isMenuOpen && (
        <div className="dropdown-menu">
          <p>{user.email}</p>
          <button onClick={logout}>Se déconnecter</button>
          <button>Changer de compte</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;