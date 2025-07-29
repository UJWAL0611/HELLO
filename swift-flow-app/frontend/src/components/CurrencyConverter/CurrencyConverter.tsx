import React, { useState, useEffect } from 'react';
import { currencyAPI } from '../../services/api';
import { Currency, ConversionResponse } from '../../types';
import CurrencySelector from './CurrencySelector';
import ExchangeRateChart from './ExchangeRateChart';
import './CurrencyConverter.css';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [currencies, setCurrencies] = useState<{ [key: string]: Currency }>({});
  const [conversion, setConversion] = useState<ConversionResponse['data'] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchSupportedCurrencies();
  }, []);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency && parseFloat(amount) > 0) {
      const timeoutId = setTimeout(() => {
        convertCurrency();
      }, 500); // Debounce API calls

      return () => clearTimeout(timeoutId);
    }
  }, [amount, fromCurrency, toCurrency]);

  const fetchSupportedCurrencies = async () => {
    try {
      const response = await currencyAPI.getSupportedCurrencies();
      if (response.success && response.data) {
        setCurrencies(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch currencies:', error);
    }
  };

  const convertCurrency = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setLoading(true);
    setError('');

    try {
      const response = await currencyAPI.convertCurrency(
        parseFloat(amount),
        fromCurrency,
        toCurrency
      );

      if (response.success && response.data) {
        setConversion(response.data);
      } else {
        setError(response.message || 'Conversion failed');
      }
    } catch (error) {
      setError('Failed to convert currency. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value: number, currencyCode: string): string => {
    const currency = currencies[currencyCode];
    if (!currency) return value.toString();

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };

  return (
    <div className="currency-converter">
      <div className="converter-header">
        <h1>Currency Converter</h1>
        <p>Get real-time exchange rates and convert currencies instantly</p>
      </div>

      <div className="converter-main">
        <div className="converter-card">
          <div className="converter-form">
            <div className="amount-section">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="amount-input"
                placeholder="Enter amount"
                disabled={loading}
              />
            </div>

            <div className="currency-section">
              <div className="currency-group">
                <label className="form-label">From</label>
                <CurrencySelector
                  selectedCurrency={fromCurrency}
                  onCurrencyChange={setFromCurrency}
                  currencies={currencies}
                  disabled={loading}
                />
              </div>

              <button
                className="swap-button"
                onClick={swapCurrencies}
                disabled={loading}
                title="Swap currencies"
              >
                ⇄
              </button>

              <div className="currency-group">
                <label className="form-label">To</label>
                <CurrencySelector
                  selectedCurrency={toCurrency}
                  onCurrencyChange={setToCurrency}
                  currencies={currencies}
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {loading && (
              <div className="loading-indicator">
                <span className="loading-spinner">⏳</span>
                Converting...
              </div>
            )}

            {conversion && !loading && (
              <div className="conversion-result">
                <div className="result-main">
                  <span className="result-amount">
                    {formatCurrency(conversion.convertedAmount, toCurrency)}
                  </span>
                </div>
                
                <div className="result-details">
                  <div className="rate-info">
                    <span>
                      1 {fromCurrency} = {parseFloat(conversion.rate).toFixed(6)} {toCurrency}
                    </span>
                    <span>
                      1 {toCurrency} = {parseFloat(conversion.inverseRate).toFixed(6)} {fromCurrency}
                    </span>
                  </div>
                  
                  <div className="last-updated">
                    Last updated: {new Date(conversion.lastUpdated).toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {fromCurrency && toCurrency && (
          <div className="chart-section">
            <ExchangeRateChart
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
            />
          </div>
        )}
      </div>

      <div className="disclaimer">
        <p>
          <strong>Disclaimer:</strong> Exchange rates are for informational purposes only 
          and may not be suitable for trading or commercial transactions. Rates may vary 
          from actual market rates and should be verified with financial institutions 
          for official transactions.
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;