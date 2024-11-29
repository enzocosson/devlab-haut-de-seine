// src/components/Header.jsx
import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/"><img src="/assets/images/logo-hds.png" alt="" /></Link>
      <div className={styles.connexion}>
        <Link to="/login" className={styles.login}>Connexion</Link>
        <Link to="/register" className={styles.signup}>Inscription</Link>
      </div>
    </header>
  );
}

export default Header;
