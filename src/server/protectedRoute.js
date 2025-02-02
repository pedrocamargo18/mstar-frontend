import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated, loading } = useAuth(); 

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
