import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
}) => {
  const { token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (requireAuth && !token) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && token) {
    // Redirect authenticated users away from auth pages
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};
