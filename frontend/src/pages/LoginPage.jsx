import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
    return (
        <div className={styles.loginPage}>
            <div className={styles.leftPane}>
                <h1>GoFinance</h1>
                <p>The most popular peer to peer lending at SEA</p>
                <button>Read More</button>
            </div>

            <div className={styles.rightPane}>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
