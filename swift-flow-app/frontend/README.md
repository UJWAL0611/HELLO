# Swift Flow Frontend

This is the React TypeScript frontend for the Swift Flow currency converter application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
GENERATE_SOURCEMAP=false
```

### Running the Application
```bash
# Development server
npm start

# Production build
npm run build

# Run tests
npm test
```

## 🏗️ Architecture

### Project Structure
```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   ├── favicon.ico         # App icon
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   │   ├── Auth/          # Authentication components
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── AuthPage.tsx
│   │   │   └── Auth.css
│   │   ├── CurrencyConverter/  # Main converter
│   │   │   ├── CurrencyConverter.tsx
│   │   │   ├── CurrencySelector.tsx
│   │   │   ├── ExchangeRateChart.tsx
│   │   │   └── CurrencyConverter.css
│   │   └── Header/        # Navigation header
│   │       ├── Header.tsx
│   │       └── Header.css
│   ├── context/           # React context providers
│   │   └── AuthContext.tsx
│   ├── services/          # API service functions
│   │   └── api.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx           # Main application component
│   ├── App.css           # Global styles
│   └── index.tsx         # Application entry point
├── package.json
└── .env                  # Environment variables
```

## 🎨 Components

### Authentication Components

#### AuthPage
Main authentication container that switches between login and register views.

#### Login
- Email and password authentication
- Form validation
- Error handling
- Password visibility toggle

#### Register
- Complete user registration form
- Fields: name, email, password, age, gender, country
- Client-side validation
- Real-time error feedback

### Currency Converter Components

#### CurrencyConverter
Main converter interface with:
- Amount input field
- Currency selectors (from/to)
- Swap currencies button
- Real-time conversion results
- Exchange rate display
- Historical chart integration

#### CurrencySelector
Searchable dropdown component:
- 150+ supported currencies
- Flag icons for visual identification
- Search/filter functionality
- Keyboard navigation support

#### ExchangeRateChart
Interactive historical chart:
- Chart.js integration
- Multiple time periods (7d, 30d, 3m, 6m, 1y)
- Responsive design
- Loading and error states

### Header Component
Navigation header with:
- Brand logo and name
- User profile display
- Navigation links
- Logout functionality

## 🔧 State Management

### AuthContext
Centralized authentication state management:
- User login/logout
- Token management
- Auto token refresh
- Protected route handling

### Local State
Component-level state using React hooks:
- Form data management
- UI state (loading, errors)
- Component interactions

## 🎨 Styling

### CSS Architecture
- Component-scoped CSS files
- BEM naming convention
- CSS custom properties for theming
- Responsive design with media queries

### Design System
```css
/* Color Palette */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--background: #f8fafc;
--text-primary: #1a202c;
--text-secondary: #718096;
--error: #ef4444;
--success: #10b981;

/* Typography */
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 480px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (min-width: 769px) { }
```

## 🔌 API Integration

### Service Layer
Centralized API communication using Axios:
- Request/response interceptors
- Automatic token attachment
- Error handling
- Type-safe responses

### API Endpoints
- Authentication: `/api/auth/*`
- Currency operations: `/api/currency/*`
- User management: `/api/user/*`

## 🧪 Testing

### Test Structure
```bash
src/
├── components/
│   └── __tests__/        # Component tests
├── services/
│   └── __tests__/        # Service tests
└── utils/
    └── __tests__/        # Utility tests
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Build & Deployment

### Development Build
```bash
npm start
```
- Hot reloading
- Source maps
- Development error overlay

### Production Build
```bash
npm run build
```
- Minified code
- Optimized assets
- Service worker (if configured)

### Environment Variables
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Build Configuration
GENERATE_SOURCEMAP=false
REACT_APP_VERSION=$npm_package_version
```

## 📱 Progressive Web App (PWA)

### Features
- Offline functionality
- App-like experience
- Install prompts
- Service worker caching

### Configuration
- `public/manifest.json` - App metadata
- Service worker registration
- Offline fallback pages

## ♿ Accessibility

### Features
- Semantic HTML structure
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Color contrast compliance

### Testing
```bash
# Accessibility audits
npm run audit:a11y

# Lighthouse testing
npm run lighthouse
```

## 🔧 Development Tools

### TypeScript
- Strict type checking
- Interface definitions
- Generic components
- Type-safe API calls

### ESLint & Prettier
- Code quality enforcement
- Consistent formatting
- Pre-commit hooks

### Development Server
- Hot module replacement
- Proxy configuration for API
- HTTPS support (if needed)

## 📊 Performance

### Optimization Techniques
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis

### Monitoring
```bash
# Bundle analyzer
npm run analyze

# Performance testing
npm run perf
```

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Add/update tests
4. Update documentation
5. Submit pull request

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Write meaningful component names
- Add proper error boundaries

## 📝 License

MIT License - see the main project LICENSE file.
