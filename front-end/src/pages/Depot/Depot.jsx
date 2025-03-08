import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Depot.module.scss";
import { useNavigate } from "react-router-dom";

function Depot() {
	const navigate = useNavigate(); // Hook pour la navigation
	const [logs, setLogs] = useState([]);
	useEffect(() => {
		const fetchUserLogs = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					alert("Vous devez être connecté.");
					navigate("/login");
					return;
				}

				const response = await fetch("http://localhost:3333/api/logs/my-logs", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.json();
				setLogs(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des logs:", error);
			}
		};

		fetchUserLogs();
	}, [navigate]);

	return (
		<div className={styles.depot}>
			<h1>Mes Dépôts</h1>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Numéro de Suivi</th>
						<th>Nom</th>
						<th>Date</th>
						<th>Description</th>
						<th>Lieu de Dépôt</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{logs.map((log) => (
						<tr key={log.id}>
							<td>{log.id}</td>
							<td>{log.Device.type}</td>
							<td>{log.date}</td>
							<td>{log.description}</td>
							<td>{log.CollectionPoint.nom}</td>
							<td>
								<Link
									to={`/dashboard/tracking/${log.id}`}
									className={styles.button}
								>
									Suivre
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Depot;
