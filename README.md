# Fire Alarm UI - Authentication Module

A modern React + TypeScript SPA for fire emergency and security system authentication.

## Features

### 🔐 Complete Authentication Flow
- **Login**: Username/email + password with "Remember me" option
- **Registration**: Two-step process with email verification
- **Forgot Password**: Email + phone verification
- **Protected Routes**: Automatic redirection based on auth status

### 🎨 Modern UI/UX
- Clean, professional design matching provided specifications
- Responsive layout with hero image sections
- Loading overlays and smooth transitions
- Form validation with real-time feedback
- Modal dialogs for multi-step processes

### 🛠 Technical Stack
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **styled-components** for styling
- **i18next** for internationalization (Vietnamese + English)
- **Axios** with mock adapter for API simulation

### 🌐 Internationalization
- Vietnamese (default) and English support
- All text content goes through i18n
- Language detection and persistence

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

For testing the login functionality:
- **Username**: Any valid email or Vietnamese phone number (e.g., `admin@demo.com` or `0901234567`)
- **Password**: `123456`

## Project Structure

```
src/
├── api/                    # API client and mock data
├── app/                    # Redux store configuration
├── components/             # Reusable UI components
│   ├── common/            # Generic components (Button, Input, etc.)
│   └── auth/              # Authentication-specific components
├── features/              # Feature-based modules
│   ├── auth/              # Authentication slice and thunks
│   └── ui/                # UI state management
├── i18n/                  # Internationalization setup
├── pages/                 # Page components
├── routes/                # Routing configuration
├── styles/                # Global styles and theme
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## Key Features Implementation

### Authentication Flow
1. **Login Page**: Form validation → API call → Redux state update → Navigation
2. **Register Step 1**: Basic info collection → Validation → Open modal
3. **Register Step 2**: Additional info in modal → API call → Success page
4. **Forgot Password**: Modal popup → Email/phone validation → Success message

### State Management
- **Auth Slice**: Token, user data, remember preference with localStorage/sessionStorage persistence
- **UI Slice**: Global loading state for overlays
- **Thunks**: Async actions for all API calls with proper error handling

### Form Validation
- Real-time validation with custom validators
- Vietnamese phone number format support
- Strong password requirements
- Email format validation

### Responsive Design
- Mobile-first approach
- Flexible layouts that work on all screen sizes
- Touch-friendly interactive elements

## API Integration

Currently uses `axios-mock-adapter` for development. To integrate with real backend:

1. Update `VITE_API_BASE_URL` in `.env`
2. Remove mock adapter import from `src/App.tsx`
3. Update API endpoints in `src/api/auth.service.ts` if needed

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code style and patterns
2. Add proper TypeScript types for all new code
3. Include i18n keys for all user-facing text
4. Test authentication flows thoroughly
5. Ensure responsive design on all screen sizes

## License

Private project for Fire Emergency and Security System.
