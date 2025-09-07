import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types/auth';

const initialState: AuthState = {
  token: undefined,
  user: undefined,
  remember: false,
};

// Helper functions for persistence
const saveToStorage = (token: string, user: User, remember: boolean) => {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem('auth_token', token);
  storage.setItem('auth_user', JSON.stringify(user));
  storage.setItem('auth_remember', remember.toString());
};

const loadFromStorage = (): Partial<AuthState> => {
  // Try localStorage first, then sessionStorage
  let token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  let userStr = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
  let rememberStr = localStorage.getItem('auth_remember') || sessionStorage.getItem('auth_remember');

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      const remember = rememberStr === 'true';
      return { token, user, remember };
    } catch (error) {
      console.error('Error parsing stored user data:', error);
    }
  }

  return {};
};

const clearStorage = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  localStorage.removeItem('auth_remember');
  sessionStorage.removeItem('auth_token');
  sessionStorage.removeItem('auth_user');
  sessionStorage.removeItem('auth_remember');
};

// Load initial state from storage
const persistedState = loadFromStorage();
const hydratedInitialState: AuthState = {
  ...initialState,
  ...persistedState,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: hydratedInitialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      
      // Save to storage based on remember preference
      saveToStorage(token, user, state.remember);
    },
    setRemember: (state, action: PayloadAction<boolean>) => {
      state.remember = action.payload;
      
      // If we have credentials and remember preference changed, update storage
      if (state.token && state.user) {
        // Clear old storage
        clearStorage();
        // Save to new storage
        saveToStorage(state.token, state.user, action.payload);
      }
    },
    logout: (state) => {
      state.token = undefined;
      state.user = undefined;
      state.remember = false;
      
      // Clear storage
      clearStorage();
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        
        // Update storage
        if (state.token) {
          saveToStorage(state.token, state.user, state.remember);
        }
      }
    },
  },
});

export const { setCredentials, setRemember, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
