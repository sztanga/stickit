import React from 'react';
import styles from './AuthLayout.module.scss';

const AuthLayout = ({ children }) => {
    return (
        <div className={styles.authPage}>
            <div className={styles.leftPane}>
                <h1>GoFinance</h1>
                <p>The most popular peer to peer lending at SEA</p>
                <button>Read More</button>
            </div>

            <div className={styles.rightPane}>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
