# Swift Flow Backend API

This is the backend API for the Swift Flow currency converter application, built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/swift_flow
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
EXCHANGE_API_KEY=your_exchange_api_key_here
EXCHANGE_API_URL=https://api.exchangerate-api.com/v4/latest/
```

### Running the Server
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 25,
  "gender": "male",
  "country": "United States"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "gender": "male",
    "country": "United States",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /api/auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Get current user information (requires authentication).

#### POST /api/auth/logout
Logout current user (requires authentication).

### Currency Endpoints

#### GET /api/currency/rates/:base
Get exchange rates for a base currency.

**Parameters:**
- `base`: Base currency code (e.g., USD, EUR)

**Response:**
```json
{
  "success": true,
  "data": {
    "base": "USD",
    "date": "2024-01-01",
    "rates": {
      "EUR": 0.85,
      "GBP": 0.75,
      "JPY": 110.0
    },
    "lastUpdated": "2024-01-01T12:00:00.000Z"
  }
}
```

#### POST /api/currency/convert
Convert currency amounts.

**Request Body:**
```json
{
  "amount": 100,
  "from": "USD",
  "to": "EUR"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "amount": 100,
    "from": "USD",
    "to": "EUR",
    "rate": "0.850000",
    "inverseRate": "1.176471",
    "convertedAmount": 85.0,
    "lastUpdated": "2024-01-01T12:00:00.000Z"
  }
}
```

#### GET /api/currency/historical/:from/:to
Get historical exchange rates.

**Parameters:**
- `from`: Source currency code
- `to`: Target currency code
- `days`: Number of days (query parameter, default: 30)

#### GET /api/currency/supported
Get list of supported currencies with details.

## 🏗️ Architecture

### Project Structure
```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── currencyController.js # Currency operations
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   └── User.js             # User data model
├── routes/
│   ├── auth.js             # Authentication routes
│   └── currency.js         # Currency routes
├── server.js               # Main server file
├── package.json
└── .env                    # Environment variables
```

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with 12 salt rounds
- **Input Validation**: express-validator for all endpoints
- **Rate Limiting**: Prevents API abuse
- **CORS**: Configured for specific origins
- **Helmet**: Security headers
- **Environment Variables**: Sensitive data protection

### Database Schema

#### User Model
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  age: Number (required, 13-120),
  gender: String (required, enum),
  country: String (required, 2-100 chars),
  createdAt: Date (default: now),
  lastLogin: Date (default: now),
  isActive: Boolean (default: true)
}
```

## 🔧 Configuration

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in `.env` file
3. The application will create the database automatically

### Exchange Rate API Setup
The application supports multiple API providers:

1. **ExchangeRate-API** (Free, no key required)
   - URL: `https://api.exchangerate-api.com/v4/latest/`
   - No setup needed

2. **Fixer.io** (Requires API key)
   - URL: `http://data.fixer.io/api/latest`
   - Get API key from fixer.io

3. **Open Exchange Rates** (Requires API key)
   - URL: `https://openexchangerates.org/api/latest.json`
   - Get API key from openexchangerates.org

### Environment Variables
```env
# Server Configuration
PORT=5000                    # Server port
NODE_ENV=development         # Environment (development/production)

# Database
MONGODB_URI=mongodb://localhost:27017/swift_flow

# Authentication
JWT_SECRET=your_jwt_secret   # Strong secret for JWT signing
JWT_EXPIRE=7d               # Token expiration time

# Exchange Rate API
EXCHANGE_API_KEY=your_key   # API key (if required)
EXCHANGE_API_URL=api_url    # API endpoint URL
```

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🚀 Deployment

### Production Setup
1. Set environment variables:
   ```env
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=strong_production_secret
   ```

2. Install dependencies:
   ```bash
   npm install --production
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 API Rate Limits

- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: Additional rate limiting on auth endpoints
- **Production**: Configure based on your needs

## 🔍 Monitoring

### Health Check
GET `/api/health` - Returns server status and environment info

### Logging
- Console logging in development
- File logging recommended for production
- Error tracking with services like Sentry

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Submit pull requests to the main repository

## 📝 License

MIT License - see the main project LICENSE file.