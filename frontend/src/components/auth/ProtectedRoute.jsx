import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
