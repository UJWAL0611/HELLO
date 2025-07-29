import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './components/Auth/AuthPage';
import Header from './components/Header/Header';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import './App.css';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <div className="loading-spinner">💱</div>
          <h2>Swift Flow</h2>
          <p>Loading your currency converter...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <CurrencyConverter />
      </main>
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>💱 Swift Flow</h3>
              <p>Professional currency conversion made simple</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h4>Product</h4>
                <ul>
                  <li><a href="#converter">Currency Converter</a></li>
                  <li><a href="#rates">Exchange Rates</a></li>
                  <li><a href="#charts">Historical Charts</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4>Support</h4>
                <ul>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#privacy">Privacy Policy</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                  <li><a href="#disclaimer">Disclaimer</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Swift Flow. All rights reserved.</p>
            <p>Exchange rates are for informational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
