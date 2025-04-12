import React from 'react';
import styles from './AuthFormWrapper.module.scss';

const AuthFormWrapper = ({ title, subtitle, children }) => {
    return (
        <div className={styles.formWrapper}>
            <h2>{title}</h2>
            <p>{subtitle}</p>
            {children}
        </div>
    );
};

export default AuthFormWrapper;
