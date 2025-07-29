# Swift Flow - Modern Currency Converter Application

![Swift Flow Logo](https://img.shields.io/badge/Swift%20Flow-Currency%20Converter-blue?style=for-the-badge&logo=currency-exchange)

Swift Flow is a next-generation currency converter application that offers both fundamental conversion tools and advanced features found in leading platforms like OANDA, XE, Wise, and Yahoo Finance. The application is designed to be intuitive, fast, and reliable with a modern, professional interface.

## 🌟 Features

### Core Functionality
- **Real-time Currency Conversion**: Instant conversion with live exchange rates
- **150+ Supported Currencies**: Major and minor world currencies with flag icons
- **Searchable Currency Selector**: Easy-to-use dropdowns with search functionality
- **Swap Currencies**: Quick button to switch From and To currencies
- **Live Updates**: Conversion results update instantly as you type
- **Exchange Rate Display**: Shows both direct and inverse exchange rates
- **Last Updated Timestamp**: Always know when rates were last refreshed

### Advanced Features
- **Historical Exchange Rate Charts**: Interactive line graphs with multiple time periods
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile
- **User Authentication**: Secure sign-in/sign-up with user profiles
- **Professional UI**: Clean, modern design with smooth animations
- **Real-time API Integration**: Live data from reliable exchange rate services

### User Experience
- **Modern Authentication**: Secure login/register with form validation
- **User Profiles**: Personal information management (name, age, gender, country)
- **Intuitive Navigation**: Clean header with user info and logout functionality
- **Loading States**: Professional loading indicators and error handling
- **Mobile Optimized**: Touch-friendly interface for all devices

## 🏗️ Technical Architecture

### Frontend (React TypeScript)
- **Framework**: React 18 with TypeScript
- **State Management**: React Context API with hooks
- **Styling**: Modern CSS with responsive design
- **Charts**: Chart.js with React integration
- **API Integration**: Axios with interceptors
- **Authentication**: JWT token-based authentication

### Backend (Node.js/Express)
- **Framework**: Express.js with TypeScript support
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Validation**: Express-validator for input validation
- **Security**: Helmet, CORS, rate limiting
- **API Integration**: Real-time exchange rate APIs

## 📦 Project Structure

```
swift-flow-app/
├── frontend/                 # React TypeScript frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Auth/        # Authentication components
│   │   │   ├── CurrencyConverter/  # Main converter
│   │   │   └── Header/      # Navigation header
│   │   ├── context/         # React context providers
│   │   ├── services/        # API service functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main application component
│   ├── package.json
│   └── .env                # Environment variables
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   ├── package.json
│   └── .env               # Environment variables
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swift-flow-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your API URL
   
   # Start the frontend development server
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/swift_flow
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
EXCHANGE_API_KEY=your_exchange_api_key_here
EXCHANGE_API_URL=https://api.exchangerate-api.com/v4/latest/
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
GENERATE_SOURCEMAP=false
```

## 🔧 API Configuration

Swift Flow supports multiple exchange rate API providers:

### Free APIs (No API Key Required)
- **ExchangeRate-API**: `https://api.exchangerate-api.com/v4/latest/`
- **Fixer.io** (limited free tier): `http://data.fixer.io/api/latest`

### Premium APIs (API Key Required)
- **Open Exchange Rates**: `https://openexchangerates.org/api/latest.json`
- **Fixer.io Pro**: `https://api.fixer.io/latest`
- **Alpha Vantage**: For historical data

## 👤 User Authentication

### Registration Fields
- **Name**: Full name (2-50 characters)
- **Email**: Valid email address (unique)
- **Password**: Minimum 6 characters
- **Age**: Must be 13-120 years old
- **Gender**: Male, Female, Other, or Prefer not to say
- **Country**: Select from predefined list

### Security Features
- Password hashing with bcrypt (12 rounds)
- JWT token-based authentication
- Session management with automatic logout
- Input validation and sanitization
- Rate limiting to prevent abuse

## 📱 Responsive Design

Swift Flow is designed to work perfectly on all devices:

- **Desktop**: Full-featured experience with side-by-side layout
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Stack layout with simplified navigation
- **Touch Support**: All interactive elements are touch-optimized

## 🎨 Design System

### Color Palette
- **Primary**: Linear gradient (#667eea to #764ba2)
- **Background**: Light gray (#f8fafc to #e2e8f0)
- **Text**: Dark gray (#1a202c)
- **Secondary**: Medium gray (#718096)
- **Error**: Red (#ef4444)
- **Success**: Green (#10b981)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)
- **Interactive**: Medium weight (500)

## 🔒 Security Considerations

- **Authentication**: Secure JWT implementation
- **Password Security**: Bcrypt hashing with salt rounds
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: API endpoint protection
- **CORS**: Configured for specific origins
- **Helmet**: Security headers for Express
- **Environment Variables**: Sensitive data protection

## 📈 Performance Optimizations

- **Debounced API Calls**: Reduces unnecessary requests
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Compressed and properly sized
- **Caching**: Browser caching for static assets
- **Minification**: Production builds are optimized
- **Code Splitting**: Reduced initial bundle size

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

### Environment Setup
- Set `NODE_ENV=production` in backend
- Configure production MongoDB URI
- Use strong JWT secrets
- Set up proper CORS origins
- Configure rate limiting for production

## 📄 Legal & Disclaimers

**Important**: Exchange rates provided by Swift Flow are for informational purposes only and may not be suitable for trading or commercial transactions. Rates may vary from actual market rates and should be verified with financial institutions for official transactions.

### Terms of Service
- Rates are provided "as is" without warranty
- No liability for trading decisions based on provided rates
- Service availability not guaranteed
- User data handled according to privacy policy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Exchange rate data provided by various API services
- Flag emojis for currency representation
- Chart.js for beautiful data visualization
- React community for excellent tooling
- MongoDB for reliable data storage

## 📞 Support

For support, email support@swiftflow.com or create an issue in this repository.

---

**Swift Flow** - Professional currency conversion made simple. 💱