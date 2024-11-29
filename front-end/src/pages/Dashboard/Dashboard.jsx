// src/pages/Dashboard.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <nav className={styles.sidebar}>
        <img
          src="/assets/images/logo.svg"
          alt="EcoConnect Logo"
          className={styles.logo}
        />
        <Link to="/dashboard/give" className={`${styles.navLink} ${styles.donner}`}>
          Donner mon matériel
        </Link>
        <Link to="/dashboard/search" className={`${styles.navLink} ${styles.chercher}`} >
        Chercher du matériel
        </Link>

        <Link to="/dashboard/give" className={styles.navLink}>
          Profil
        </Link>
        <Link to="/dashboard/search" className={styles.navLink}>
          Dépot
        </Link>
        <Link to="/dashboard/profile" className={styles.navLink}>
          Suivi
        </Link>
      </nav>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
