import Lenis from "lenis";
import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function HomePage() {
	const [logged, setLogged] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				console.log(decodedToken.email);
				setLogged(true);
			} catch (error) {
				console.error("Erreur lors du décodage du token:", error);
				setLogged(false);
			}
		}
	}, []);

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
				{logged ? (
					<Link to="/dashboard/find-location" className={styles.give}>
						Proposez un don
					</Link>
				) : (
					""
				)}
			</div>
			<img src="/assets/images/map.png" alt="map" className={styles.map} />
		</main>
	);
}

export default HomePage;
