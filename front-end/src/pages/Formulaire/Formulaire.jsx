import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Formulaire.module.scss";
import { jwtDecode } from "jwt-decode";

function Formulaire() {
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const navigate = useNavigate();
	const location = useLocation();

	const [userId, setUserId] = useState(null);
	const [logged, setLogged] = useState("");
	const [devices, setDevices] = useState([]);

	const searchParams = new URLSearchParams(location.search);
	const mairieId = searchParams.get("mairie");

	const userIdtemp = "123456"; // Remplace ceci par la vraie récupération de l'ID utilisateur

	const [formData, setFormData] = useState({
		materialName: "",
		materialTypeId: "",
		description: "",
	});

	useEffect(() => {
		setLogged(false);
		const token = localStorage.getItem("token");
		if (token)
			try {
				const decodedToken = jwtDecode(token);
				setUserId(decodedToken.id);
				setLogged(true);
				fetchCollectionPoint();
				fetchDevices();
			} catch (error) {
				console.error("Erreur lors du décodage du token:", error);
				setLogged(false);
			}
		else navigate("/login");
	}, []);

	const [photos, setPhotos] = useState([]);

	const [collectionPoint, setCollectionPoint] = useState([]);
	const fetchCollectionPoint = async () => {
		console.log(mairieId);
		try {
			const response = await fetch(
				`${API_BASE_URL}/collection-points/${mairieId}`,
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			const data = await response.json();
			setCollectionPoint(data);
			console.log(data);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des points de collecte :",
				error
			);
		}
	};

	const fetchDevices = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/devices`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			});
			const data = await response.json();
			console.log(data);
			console.log(devices);
			setDevices(data);
		} catch (error) {
			console.error("Erreur lors de la récupération des appareils :", error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePhotoUpload = (e, index) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setPhotos((prev) => {
					const newPhotos = [...prev];
					newPhotos[index] = reader.result; // Stockage en base64
					return newPhotos;
				});
			};
		}
	};

	// Création d'un dépôt
    const handleCreateDepot = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/logs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    device_id: formData.materialTypeId,
                    collection_point_id: mairieId,
					description:formData.description
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création du dépôt.');
            }

			const data = await response.json();
			const qrCodeData = {
				userIdtemp,
				materialName: formData.materialName,
				mairie: collectionPoint.nom
			};
			
			navigate("/confirmation", { state: { qrCodeData } });  // Redirection après la création
        } catch (error) {
            console.error('Erreur lors de la création du dépôt:', error);
        }
    };

	return (
		<div className={styles.formulaire}>
			<div className={styles.container}>
				<nav className={styles.slidebar}></nav>
				<div className={styles.form}>
					<div className={styles.photosSection}>
						<div className={styles.photosGrid}>
							{Array.from({ length: 6 }).map((_, index) => (
								<div
									key={index}
									className={styles.photoContainer}
									style={{
										backgroundColor: photos[index] ? "transparent" : "#ccc",
										backgroundImage: photos[index]
											? `url(${photos[index]})`
											: "none",
										backgroundSize: "cover",
										backgroundPosition: "center",
									}}
								>
									{!photos[index] && (
										<label className={styles.uploadButton}>
											+
											<input
												type="file"
												accept="image/*"
												onChange={(e) => handlePhotoUpload(e, index)}
												style={{ display: "none" }}
											/>
										</label>
									)}
								</div>
							))}
						</div>
					</div>

					<form onSubmit={handleCreateDepot} className={styles.formSection}>
						<div className={styles.fieldContainers}>
							<div className={[styles.formGroup]}>
								<input
									type="text"
									id="materialName"
									name="materialName"
									placeholder="Nom du matériel"
									value={formData.materialName}
									onChange={handleChange}
									required
								/>
							</div>

							<div className={[styles.formGroup]}>
								<select
									id="materialTypeId"
									name="materialTypeId"
									value={formData.materialTypeId}
									onChange={handleChange}
									required
								>
									<option value="" disabled>
										- Type de matériel
									</option>
									{devices.map((device) => {
										return (
											<option key={device.id} value={device.id}>
												{device.type}
											</option>
										);
									})}
								</select>
							</div>

							<div className={[styles.formGroup]}>
								<textarea
									id="description"
									name="description"
									placeholder="Description du matériel"
									value={formData.description}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className={styles.fieldContainers}>
							<div className={styles.mapSection}>
								<div className={styles.mapContainer}>
									<iframe
										title="Carte localisation"
										src={`https://www.google.com/maps?q=${encodeURIComponent(
											collectionPoint.nom
										)}&output=embed`}
										className={styles.map}
									></iframe>
								</div>
							</div>

							<button type="submit" className={styles.submitButton}>
								Envoyer
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Formulaire;
