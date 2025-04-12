import React from 'react';
import styles from './AppShell.module.scss';
import api from '../../services/api';

const AppShell = ({ children }) => {
    const handleLogout = async () => {
        try {
            await api.post('/logout');
            window.location.href = '/login';
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src="/logo.png" alt="StickIt Logo"/>
                </div>
                <button className={styles.logout} onClick={handleLogout}>
                    Logout
                </button>
            </header>

            <main className={styles.content}>{children}</main>

            <footer className={styles.footer}>
                <p>© {new Date().getFullYear()} StickIt • by Kamil</p>
            </footer>
        </div>
    );
};

export default AppShell;
