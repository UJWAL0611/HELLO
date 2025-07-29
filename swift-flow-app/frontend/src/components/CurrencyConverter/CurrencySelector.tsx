import React, { useState, useRef, useEffect } from 'react';
import { Currency } from '../../types';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  currencies: { [key: string]: Currency };
  disabled?: boolean;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
  currencies,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCurrencies = Object.entries(currencies).filter(([code, currency]) =>
    code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleCurrencySelect = (currencyCode: string) => {
    onCurrencyChange(currencyCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedCurrencyData = currencies[selectedCurrency];

  return (
    <div className="currency-selector" ref={dropdownRef}>
      <button
        type="button"
        className={`currency-button ${isOpen ? 'open' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="currency-display">
          {selectedCurrencyData && (
            <>
              <span className="currency-flag">{selectedCurrencyData.flag}</span>
              <span className="currency-code">{selectedCurrency}</span>
              <span className="currency-name">{selectedCurrencyData.name}</span>
            </>
          )}
        </div>
        <span className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div className="currency-dropdown">
          <div className="search-container">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search currencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="currency-search"
            />
          </div>
          
          <div className="currency-list">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map(([code, currency]) => (
                <button
                  key={code}
                  type="button"
                  className={`currency-option ${code === selectedCurrency ? 'selected' : ''}`}
                  onClick={() => handleCurrencySelect(code)}
                >
                  <span className="currency-flag">{currency.flag}</span>
                  <span className="currency-info">
                    <span className="currency-code">{code}</span>
                    <span className="currency-name">{currency.name}</span>
                  </span>
                </button>
              ))
            ) : (
              <div className="no-results">
                No currencies found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;