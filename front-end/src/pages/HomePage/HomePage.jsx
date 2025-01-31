import Lenis from "lenis";
import React from "react";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";

function HomePage() {


  return (
    <main className={styles.main}>
      <img
        src="/assets/images/logo.svg"
        alt="EcoConnect Logo"
        className={styles.logo}
      />
      <h1>
        Vos appareils méritent <br />
        une seconde vie.
      </h1>
      <h2>
        Donnez une nouvelle vie à votre matériel pour un numérique
        <br />
        solidaire et durable.
      </h2>
      <div className={styles.buttons}>
        <Link to="/dashboard/find-location" className={styles.give}>
          Proposez un don
        </Link>
      </div>
      <img src="/assets/images/map.png" alt="map" className={styles.map} />
    </main>
  );
}

export default HomePage;
