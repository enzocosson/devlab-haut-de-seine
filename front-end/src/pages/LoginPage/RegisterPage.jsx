// src/pages/RegisterPage.jsx
import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const navigate = useNavigate();
	const [userForm, setUserForm] = useState({
		nom: "",
		prenom: "",
		adresse: "",
		email: "",
		password: "",
		tel: "",
	});

	const insertUser = async (e) => {
		e.preventDefault();

		const response = await fetch(`${API_BASE_URL}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userForm),
		});

		const isError = response.ok;
		if (isError) navigate("/login");
		else {
			alert("Erreur lors de la création de l'utilisateur");
			console.error(
				"Erreur lors de la création de l'utilisateur:",
				response.statusText
			);
		}
	};

	const handleChangeForm = (e) => {
		const { name, value } = e.target;
		setUserForm((prevForm) => ({ ...prevForm, [name]: value }));
	};

	return (
		<main className={styles.main}>
			<div className={styles.bg__blur}></div>

			<div className={styles.hdsLogo}>
				<Link to="/">
					<img src="/assets/images/logo-hds.png" alt="" />
				</Link>
			</div>

			<div className={styles.registerCard}>
				<div className={styles.logo}>
					<img src="/assets/images/logo.png" alt="EcoConnect" />
				</div>

				<div className={styles.registerForm}>
					<div className={styles.titleLoginForm}>
						<h1>Bienvenue sur EcoConnect !</h1>
						<p>Entrez vos informations pour créer votre compte</p>
					</div>

					<form onSubmit={insertUser}>
						<div className={styles.fullName}>
							<div className={styles.loginInput}>
								<label htmlFor="nom">Nom</label>
								<input
									type="text"
									name="nom"
									placeholder="ex : Legrand"
									value={userForm.nom}
									onChange={handleChangeForm}
									required
								/>
							</div>
							<div className={styles.loginInput}>
								<label htmlFor="prenom">Prénom</label>
								<input
									type="text"
									name="prenom"
									placeholder="ex : Carole"
									value={userForm.prenom}
									onChange={handleChangeForm}
									required
								/>
							</div>
						</div>
						<div className={styles.fullName}>
							<div className={styles.loginInput}>
								<label htmlFor="email">Adresse</label>
								<input
									type="text"
									name="adresse"
									placeholder="ex : 11 rue Général de Gaulle"
									value={userForm.adresse}
									onChange={handleChangeForm}
									required
								/>
							</div>
							<div className={styles.loginInput}>
								<label htmlFor="tel">Téléphone</label>
								<input
									type="text"
									maxLength="10"
									name="tel"
									placeholder="ex : 0602030605"
									value={userForm.tel}
									onChange={handleChangeForm}
									required
								/>
							</div>
						</div>
						<div className={styles.loginInput}>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								placeholder="ex : carole@gmail.fr"
								value={userForm.email}
								onChange={handleChangeForm}
								required
							/>
						</div>
						<div className={styles.loginInput}>
							<label htmlFor="password">Mot de passe</label>
							<input
								type="password"
								name="password"
								placeholder="Entrez votre mot de passe"
								value={userForm.password}
								onChange={handleChangeForm}
								required
							/>
						</div>
						<button type="submit" className={styles.loginButton}>
							S'inscrire
						</button>
					</form>
				</div>

				<div>
					Vous avez déjà un compte ?{" "}
					<span>
						<Link to="/login">Connectez-vous</Link>
					</span>
				</div>
			</div>
		</main>
	);
}

export default RegisterPage;
