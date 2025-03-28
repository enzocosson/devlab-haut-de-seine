// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [logged, setLogged] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				setEmail(decodedToken.email);
				setName(decodedToken.name);
				setLogged(true);
			} catch (error) {
				console.error("Erreur lors du décodage du token:", error);
				navigate("/login");
				setLogged(false);
			}
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<header className={styles.header}>
			<Link to="/">
				<img src="/assets/images/logo-hds.png" alt="" />
			</Link>
			{/* <div className={styles.connexion}>
        <Link to="/login" className={styles.login}>Connexion</Link>
        <Link to="/register" className={styles.signup}>Inscription</Link>
      </div> */}
			{logged ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className={styles.container__profil}>
							<div className={styles.container__profil__img}>
								<img className={styles.pp} src="/assets/images/pp.png" alt="" />
							</div>
							<div className={styles.container__profil__infos}>
								<p className={styles.container__profil__infos__name}>{name}</p>
								<p className={styles.container__profil__infos__email}>
									{email}
								</p>
							</div>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className={styles.dropdown}>
						<DropdownMenuItem>
							<Link to="/dashboard/profil">Mon profil</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link to="/dashboard/depot">Mes dépots</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<button onClick={handleLogout}> Se déconnecter</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<div className={styles.buttons}>
					<Link to="/login" className={styles.give}>
						Se Connecter
					</Link>
				</div>
			)}
		</header>
	);
}

export default Header;
