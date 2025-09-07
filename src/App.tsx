import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '@/app/store';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/global';
import { LoadingOverlay } from '@/components/common/LoadingOverlay';
import { AppRoutes } from '@/routes/AppRoutes';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { fetchMeThunk } from '@/features/auth/auth.thunks';
import '@/i18n';
import '@/api/mock'; // Initialize mock API

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.ui);
  const { token } = useAppSelector((state) => state.auth);

  // Fetch user data if token exists
  useEffect(() => {
    if (token) {
      dispatch(fetchMeThunk());
    }
  }, [dispatch, token]);

  return (
    <>
      <GlobalStyle />
      <AppRoutes />
      <LoadingOverlay isVisible={loading} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
