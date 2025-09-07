import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { RegisterSuccessPage } from '@/pages/RegisterSuccessPage';
import { HomePage } from '@/pages/HomePage';
import { useAppSelector } from '@/app/hooks';

export const AppRoutes: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {/* Root route - redirect based on auth status */}
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public routes (redirect to home if authenticated) */}
      <Route
        path="/login"
        element={
          <ProtectedRoute requireAuth={false}>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/register"
        element={
          <ProtectedRoute requireAuth={false}>
            <RegisterPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/register/success"
        element={
          <ProtectedRoute requireAuth={false}>
            <RegisterSuccessPage />
          </ProtectedRoute>
        }
      />

      {/* Protected routes (require authentication) */}
      <Route
        path="/home"
        element={
          <ProtectedRoute requireAuth={true}>
            <HomePage />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to appropriate page */}
      <Route
        path="*"
        element={
          token ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};
