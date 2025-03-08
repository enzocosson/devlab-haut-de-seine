import React, { useState, useEffect } from "react";
import styles from "./Profil.module.scss";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Profil() {
	const [userInfo, setUserInfo] = useState({
		nom: "",
		email: "",
		adresse: "",
		tel: "",
	});
	const [userInfoBackup, setUserInfoBackup] = useState({
		nom: "",
		email: "",
		adresse: "",
		tel: "",
	});

	const navigate = useNavigate(); // Hook pour la navigation
	const [logged, setLogged] = useState("");
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		setLogged(false);
		const token = localStorage.getItem("token");
		if (token)
			try {
				const decodedToken = jwtDecode(token);
				fetchUserData(decodedToken.id);
				setUserId(decodedToken.id);
				setLogged(true);
			} catch (error) {
				console.error("Erreur lors du décodage du token:", error);
				setLogged(false);
			}
		else navigate("/login");
	}, []);

	// Récupérer les données de l'utilisateur connecté
	const fetchUserData = async (id) => {
		try {
			const response = await fetch(`http://localhost:3333/api/users/${id}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			});
			const data = await response.json();
			setUserInfo(data);
		} catch (error) {
			console.error("Erreur lors de la récupération des données:", error);
		}
	};

	const handleUpdate = async () => {
		try {
			await fetch(`http://localhost:3333/api/users/${userId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(userInfo),
			});
			setIsEditing(false);
		} catch (error) {
			console.error("Erreur lors de la mise à jour :", error);
		}
	};

	const [isEditing, setIsEditing] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserInfo((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const closeModification = () => {
		setUserInfo(userInfoBackup);
		setIsEditing(false);
	};

	const openModification = () => {
		setUserInfoBackup(userInfo);
		setIsEditing((prev) => !prev);
	};

	return (
		<div className={styles.profil}>
			<h1>Mon Profil</h1>
			<div className={styles.profileInfo}>
				<label>
					Nom :
					{isEditing ? (
						<input
							type="text"
							name="nom"
							value={userInfo.nom}
							onChange={handleInputChange}
						/>
					) : (
						<span>{userInfo.nom}</span>
					)}
				</label>
				<label>
					Email :
					{isEditing ? (
						<input
							type="email"
							name="email"
							value={userInfo.email}
							onChange={handleInputChange}
						/>
					) : (
						<span>{userInfo.email}</span>
					)}
				</label>
				<label>
					Adresse :
					{isEditing ? (
						<input
							type="text"
							name="adresse"
							value={userInfo.adresse}
							onChange={handleInputChange}
						/>
					) : (
						<span>{userInfo.adresse}</span>
					)}
				</label>
				<label>
					Téléphone :
					{isEditing ? (
						<input
							type="text"
							maxLength="10"
							name="tel"
							value={userInfo.tel}
							onChange={handleInputChange}
						/>
					) : (
						<span>{userInfo.tel}</span>
					)}
				</label>
			</div>
			<div className={styles.actions}>
				<button onClick={isEditing ? handleUpdate : openModification}>
					{isEditing ? "Enregistrer" : "Modifier"}
				</button>
				{isEditing && <button onClick={closeModification}>Annuler</button>}
			</div>
		</div>
	);
}

export default Profil;
