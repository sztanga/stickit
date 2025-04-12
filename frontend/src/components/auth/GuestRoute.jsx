import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const GuestRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return children;
    }

    return <Navigate to="/notes" replace />;
};

export default GuestRoute;
