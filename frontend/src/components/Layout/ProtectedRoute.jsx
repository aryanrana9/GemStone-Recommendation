import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Skeleton } from '../UI/Skeleton';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmic-950 flex flex-col items-center justify-center p-8 gap-4">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-6 w-72" />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ redirectUrl: location.pathname + location.search }} replace />;
  }

  if (adminOnly && user && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
