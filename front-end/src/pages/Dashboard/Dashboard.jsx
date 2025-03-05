import React, { useState, useEffect, useRef } from "react";
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
	Link,
} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom"; // Pour la redirection
import { Settings, Package, UserPen, LogOut, MapPin } from "lucide-react";

import styles from "./Dashboard.module.scss";
import Depot from "../Depot/Depot";
import Map from "../Map/Map";
import Profil from "../Profil/Profil";
import TrackingDetails from "../TrackingDetails/TrackingDetails";

import { jwtDecode } from "jwt-decode";

function Dashboard() {
	const mapRef = useRef();
	const navigate = useNavigate(); // Hook pour la navigation
	const [pointsRelais, setPointsRelais] = useState([
		{
			id: 1,
			name: "Mairie de Boulogne-Billancourt",
			lat: 48.8397,
			lng: 2.2399,
		},
		{ id: 2, name: "Mairie de Nanterre", lat: 48.8925, lng: 2.2067 },
		{ id: 3, name: "Mairie de Courbevoie", lat: 48.8977, lng: 2.2567 },
		{ id: 4, name: "Mairie de Colombes", lat: 48.9226, lng: 2.254 },
		{ id: 5, name: "Mairie de Rueil-Malmaison", lat: 48.8779, lng: 2.1799 },
		{ id: 6, name: "Mairie de Clamart", lat: 48.7988, lng: 2.2667 },
		{ id: 7, name: "Mairie d’Issy-les-Moulineaux", lat: 48.822, lng: 2.2772 },
		{ id: 8, name: "Mairie de Suresnes", lat: 48.8714, lng: 2.2295 },
		{ id: 9, name: "Mairie de Levallois-Perret", lat: 48.893, lng: 2.288 },
		{ id: 10, name: "Mairie de Meudon", lat: 48.8133, lng: 2.2384 },
	]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
		}
	}, []);

	const [selectedPoint, setSelectedPoint] = useState(null);

	const handlePointClick = (point) => {
		setSelectedPoint(point);
		const map = mapRef.current;
		if (map) {
			map.flyTo([point.lat, point.lng], 15, { duration: 1.5 });
		}
	};

	const handleDepositClick = () => {
		if (selectedPoint) {
			// Redirige vers la page de formulaire avec le nom de la mairie sélectionnée
			navigate(`/formulaire?mairie=${encodeURIComponent(selectedPoint.name)}`);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
	};

	const location = useLocation();

	return (
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
	);
}

export default Dashboard;
