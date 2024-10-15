import React from 'react';
import styles from '../css/LoginFormPage.module.css';

const LoginFormPage = () => {
  return (
    <main className={styles.container}>
      <form className={styles.loginForm}>
        <h1 className={styles.logo}>NARZ</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="Enter your email"
            aria-label="Email"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Enter your password"
            aria-label="Password"
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>Sign In</button>
        </div>
        <a href="#" className={styles.forgotPassword}>Forgot password?</a>
      </form>
    </main>
  );
};

export default LoginFormPage;