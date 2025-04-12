import React, { useState } from 'react';
import api from '../../../services/api';
import styles from '../layout/AuthLayout.module.scss';
import AuthFormWrapper from '../form-wrapper/AuthFormWrapper';
import { Link } from 'react-router-dom';

const RegisterForm = ({ onRegisterSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            await api.post('/register', { email, password });
            setSuccess(true);
            onRegisterSuccess?.();
        } catch (err) {
            const message = err.response?.data?.error || 'Unexpected error occurred';
            setError(message);
        }
    };

    return (
        <AuthFormWrapper title="Get Started" subtitle="Create your account">
            <form className={styles.authForm} onSubmit={handleSubmit}>
                {success && <div className={styles.success}>Account created! You can now <Link to="/login">log in</Link>.</div>}
                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.inputGroup}>
                    <span className={styles.icon}>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M23 6V18C23 19.6523 21.6523 21 20 21H4C2.34772 21 1 19.6523 1 18V6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6ZM3.10658 5.55395C3.27196 5.22692 3.61204 5 4 5H20C20.388 5 20.728 5.22692 20.8934 5.55395L12 11.7793L3.10658 5.55395ZM3 7.92066L10.8531 13.4178C11.5417 13.8999 12.4583 13.8999 13.1469 13.4178L21 7.92066V18C21 18.5477 20.5477 19 20 19H4C3.45228 19 3 18.5477 3 18V7.92066Z"
                              fill="#000000"/>
                      </svg>
                    </span>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.icon}>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8Z"
                              fill="#1C274C"/>
                      </svg>
                    </span>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Register</button>

                <p className={styles.linkAlt}>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </form>
        </AuthFormWrapper>
    );
};

export default RegisterForm;
