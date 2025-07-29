const express = require('express');
const { body, param, query } = require('express-validator');
const {
  getExchangeRates,
  convertCurrency,
  getHistoricalRates,
  getSupportedCurrencies
} = require('../controllers/currencyController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const currencyCodeValidation = [
  param('base')
    .isLength({ min: 3, max: 3 })
    .isAlpha()
    .toUpperCase()
    .withMessage('Currency code must be 3 letters')
];

const conversionValidation = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),
  body('from')
    .isLength({ min: 3, max: 3 })
    .isAlpha()
    .toUpperCase()
    .withMessage('From currency must be 3 letters'),
  body('to')
    .isLength({ min: 3, max: 3 })
    .isAlpha()
    .toUpperCase()
    .withMessage('To currency must be 3 letters')
];

const historicalValidation = [
  param('from')
    .isLength({ min: 3, max: 3 })
    .isAlpha()
    .toUpperCase()
    .withMessage('From currency must be 3 letters'),
  param('to')
    .isLength({ min: 3, max: 3 })
    .isAlpha()
    .toUpperCase()
    .withMessage('To currency must be 3 letters'),
  query('days')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('Days must be between 1 and 365')
];

// Routes
router.get('/rates/:base', protect, currencyCodeValidation, getExchangeRates);
router.post('/convert', protect, conversionValidation, convertCurrency);
router.get('/historical/:from/:to', protect, historicalValidation, getHistoricalRates);
router.get('/supported', protect, getSupportedCurrencies);

module.exports = router;