import React, { useState, useEffect } from "react";
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
	Link,
} from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { Settings, Package, UserPen, LogOut, MapPin } from "lucide-react";

import styles from "./Dashboard.module.scss";
import Depot from "../Depot/Depot";
import Map from "../Map/Map";
import Profil from "../Profil/Profil";
import TrackingDetails from "../TrackingDetails/TrackingDetails";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
	const navigate = useNavigate(); // Hook pour la navigation
	const [logged, setLogged] = useState("");

	useEffect(() => {
		setLogged(false);
		const token = localStorage.getItem("token");
		if (token)
			try {
				const decodedToken = jwtDecode(token);
				console.log(decodedToken.email);
				setLogged(true);
			} catch (error) {
				console.error("Erreur lors du décodage du token:", error);
				setLogged(false);
			}
		else navigate("/login");
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	const location = useLocation();

	return logged ? (
		<div className={styles.dashboard}>
			<div className={styles.navbar}>
				<div className={styles.navbar__top}>
					<Link
						to="/dashboard/find-location"
						className={
							location.pathname === "/find-location" ? styles.active : ""
						}
					>
						<MapPin />
						Ou déposer ?
					</Link>
					<Link
						to="/dashboard/profil"
						className={
							location.pathname === "/dashboard/profil" ? styles.active : ""
						}
					>
						<UserPen />
						Mon profil
					</Link>
					<Link
						to="/dashboard/depot"
						className={
							location.pathname === "/dashboard/depot" ? styles.active : ""
						}
					>
						<Package />
						Mes Dépots
					</Link>
				</div>

				<div className={styles.navbar__bottom}>
					<Link to="/settings">
						<Settings />
						Paramètres
					</Link>
					<Link className={styles.logout} to="/login">
						<LogOut />
						<button onClick={handleLogout}> Se déconnecter</button>
					</Link>
				</div>
			</div>

			<div className={styles.container}>
				<Routes>
					<Route path="/find-location" element={<Map />} />
					<Route path="/profil" element={<Profil />} />
					<Route path="/depot" element={<Depot />} />
					<Route
						path="/tracking/:trackingNumber"
						element={<TrackingDetails />}
					/>
				</Routes>
			</div>
		</div>
	) : (
		""
	);
}

export default Dashboard;
