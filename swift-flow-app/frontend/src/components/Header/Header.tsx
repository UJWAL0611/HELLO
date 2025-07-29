import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="brand-title">
            <span className="brand-icon">💱</span>
            Swift Flow
          </h1>
          <span className="brand-tagline">Currency Converter</span>
        </div>

        <nav className="header-nav">
          <div className="nav-links">
            <a href="#converter" className="nav-link active">
              Converter
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#help" className="nav-link">
              Help
            </a>
          </div>

          <div className="user-section">
            {user && (
              <div className="user-info">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className="user-location">{user.country}</span>
                </div>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="logout-button"
              title="Logout"
            >
              <span className="logout-icon">🚪</span>
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;