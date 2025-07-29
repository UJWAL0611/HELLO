const axios = require('axios');

// @desc    Get exchange rates
// @route   GET /api/currency/rates/:base
// @access  Private
const getExchangeRates = async (req, res) => {
  try {
    const { base = 'USD' } = req.params;
    
    // Using a free exchange rate API (exchangerate-api.com)
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${base}`);
    
    if (!response.data) {
      return res.status(400).json({
        success: false,
        message: 'Unable to fetch exchange rates'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        base: response.data.base,
        date: response.data.date,
        rates: response.data.rates,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Exchange rate fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exchange rates',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Convert currency
// @route   POST /api/currency/convert
// @access  Private
const convertCurrency = async (req, res) => {
  try {
    const { amount, from, to } = req.body;

    if (!amount || !from || !to) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount, from currency, and to currency'
      });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number'
      });
    }

    // Get exchange rates
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
    
    if (!response.data || !response.data.rates[to]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid currency codes or conversion not available'
      });
    }

    const rate = response.data.rates[to];
    const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
    const inverseRate = (1 / rate).toFixed(6);

    res.status(200).json({
      success: true,
      data: {
        amount: parseFloat(amount),
        from,
        to,
        rate: rate.toFixed(6),
        inverseRate,
        convertedAmount: parseFloat(convertedAmount),
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Currency conversion error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to convert currency',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get historical rates
// @route   GET /api/currency/historical/:from/:to
// @access  Private
const getHistoricalRates = async (req, res) => {
  try {
    const { from, to } = req.params;
    const { days = 30 } = req.query;

    // For demonstration, we'll generate mock historical data
    // In a real application, you'd use a service like Alpha Vantage, Fixer.io, or similar
    const historicalData = [];
    const currentDate = new Date();
    const baseRate = Math.random() * 2 + 0.5; // Random base rate between 0.5 and 2.5

    for (let i = parseInt(days); i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      
      // Generate realistic fluctuation (±5% from base rate)
      const fluctuation = (Math.random() - 0.5) * 0.1;
      const rate = baseRate * (1 + fluctuation);
      
      historicalData.push({
        date: date.toISOString().split('T')[0],
        rate: parseFloat(rate.toFixed(6))
      });
    }

    res.status(200).json({
      success: true,
      data: {
        from,
        to,
        period: `${days} days`,
        historical: historicalData
      }
    });
  } catch (error) {
    console.error('Historical rates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch historical rates',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get supported currencies
// @route   GET /api/currency/supported
// @access  Private
const getSupportedCurrencies = async (req, res) => {
  try {
    // Common currencies with their details
    const currencies = {
      'USD': { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
      'EUR': { name: 'Euro', symbol: '€', flag: '🇪🇺' },
      'GBP': { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
      'JPY': { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
      'AUD': { name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
      'CAD': { name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
      'CHF': { name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
      'CNY': { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
      'SEK': { name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
      'NZD': { name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
      'MXN': { name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
      'SGD': { name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
      'HKD': { name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
      'NOK': { name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
      'INR': { name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
      'BRL': { name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
      'RUB': { name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
      'KRW': { name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
      'TRY': { name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
      'ZAR': { name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
      'PLN': { name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
      'DKK': { name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
      'CZK': { name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
      'HUF': { name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
      'ILS': { name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
      'CLP': { name: 'Chilean Peso', symbol: '$', flag: '🇨🇱' },
      'PHP': { name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
      'AED': { name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
      'COP': { name: 'Colombian Peso', symbol: '$', flag: '🇨🇴' },
      'SAR': { name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
      'MYR': { name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
      'RON': { name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
      'THB': { name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
      'BGN': { name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
      'HRK': { name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷' },
      'ISK': { name: 'Icelandic Krona', symbol: 'kr', flag: '🇮🇸' },
      'UYU': { name: 'Uruguayan Peso', symbol: '$U', flag: '🇺🇾' }
    };

    res.status(200).json({
      success: true,
      data: currencies,
      count: Object.keys(currencies).length
    });
  } catch (error) {
    console.error('Supported currencies error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch supported currencies'
    });
  }
};

module.exports = {
  getExchangeRates,
  convertCurrency,
  getHistoricalRates,
  getSupportedCurrencies
};