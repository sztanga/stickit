import React from 'react';
import AuthLayout from '../components/auth/layout/AuthLayout';
import LoginForm from '../components/auth/login/LoginForm';

const LoginPage = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};

export default LoginPage;
