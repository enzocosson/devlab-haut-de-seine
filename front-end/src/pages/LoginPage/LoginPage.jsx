// src/pages/LoginPage.jsx
import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { checkUserLogin } from "@/pages/LoginPage/LogAPI.jsx";
import axios from "axios";

function LoginPage() {
	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
	console.log("API Base URL :", API_BASE_URL);

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	// const [form, setForm] = useState({ email: "", password: "" });
	const [forgetPassword, setForgetPassword] = useState(false);
	const [emailAccount, setEmailAccount] = useState("");
	const [resetPassword, setResetPassword] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// const checkLogin = async () => {
	//     setLoading(true);
	//     try {
	//         const userLog = await checkUserLogin()
	//         if (userLog) {
	//             if (isRemembered) {
	//                 localStorage.setItem("@user", JSON.stringify(form))
	//             } else {
	//                 localStorage.removeItem("@user")
	//             }
	//             navigate("/dashboard")
	//         }
	//     } catch (err) {
	//         console.log(err)
	//     }
	//     setLoading(false)
	// }

	// const handleChangeForm = (e) => {
	// 	const { name, value } = e.target;
	// 	setForm((prevForm) => ({ ...prevForm, [name]: value }));
	// };

	const handleChangeEmail = (e) => {
		const { value } = e.target;
		setEmailAccount(value);
	};

	const handlePassword = () => {
		setForgetPassword(!forgetPassword);
		setResetPassword(false);
	};

	const resetMail = () => {
		if (!resetPassword) {
			console.log("Mail for reset password send to", emailAccount);
			setResetPassword(true);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("email: ", email, "password: ", password);
			const response = await axios.post(
				`${API_BASE_URL}/auth/login`,
				{
					email,
					password,
				}
			);
			localStorage.setItem("token", response.data.token); // Stockage du token dans le localStorage
			// alert("Connexion réussie !");
			navigate("/"); // Redirection vers la page principale après connexion
		} catch (error) {
			alert("Erreur de connexion, vérifiez vos identifiants.");
		}
	};

	return (
		<main className={styles.main}>
			<div className={styles.bg__blur}></div>

			<div className={styles.hdsLogo}>
				<Link to="/">
					<img src="/assets/images/logo-hds.png" alt="" />
				</Link>
			</div>

			<div className={styles.loginCard}>
				<div className={styles.logo}>
					<img src="/assets/images/logo.png" alt="" />
				</div>

				{!forgetPassword && (
					<>
						<div className={styles.loginForm}>
							<div className={styles.titleLoginForm}>
								<h1>Heureux de vous revoir !</h1>
								<p>Entrez vos informations de connexion</p>
							</div>

							<form onSubmit={handleSubmit}>
								<div className={styles.loginInput}>
									<label htmlFor="email">Email</label>
									<input
										type="text"
										name={"email"}
										placeholder={"ex : carole@gmail.fr"}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required={true}
									/>
								</div>
								<div className={styles.loginInput}>
									<label htmlFor="email">Mot de passe</label>
									<input
										type="password"
										name={"password"}
										placeholder={"Entrez votre mot de passe"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required={true}
									/>
								</div>
								<div className={styles.loginCredential}>
									<p className={styles.pointer} onClick={handlePassword}>
										Mot de passe oublié ?
									</p>
								</div>
								<button
									type="submit"
									className={styles.loginButton}
									disabled={loading}
								>
									{loading ? <CircularProgress /> : "Se connecter"}
								</button>
							</form>
						</div>

						<div>
							Vous n'avez pas de compte ?{" "}
							<span>
								<Link to="/register">Inscrivez-vous</Link>
							</span>
						</div>
					</>
				)}

				{forgetPassword && (
					<>
						<div className={styles.loginForm}>
							<div className={styles.titleLoginForm}>
								<h1>Mot de passe oublié ?</h1>
								<p>Réinitialisation du mot de passe</p>
							</div>

							<form>
								<div className={styles.loginInput}>
									<label htmlFor="email">Email</label>
									<input
										type="text"
										name={"email"}
										placeholder={"ex : carole@gmail.fr"}
										value={emailAccount}
										onChange={handleChangeEmail}
										required={true}
									/>
								</div>
								<div
									onClick={resetMail}
									className={
										resetPassword ? styles.resetButton : styles.loginButton
									}
								>
									{resetPassword ? "Mail envoyé" : "Envoyer le mail"}
								</div>
							</form>
						</div>

						<p className={styles.pointer} onClick={handlePassword}>
							Retour à la connexion
						</p>
					</>
				)}
			</div>
		</main>
	);
}

export default LoginPage;
