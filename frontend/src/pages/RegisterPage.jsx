import React from 'react';
import AuthLayout from '../components/auth/layout/AuthLayout';
import RegisterForm from '../components/auth/register/RegisterForm';

const RegisterPage = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
};

export default RegisterPage;
