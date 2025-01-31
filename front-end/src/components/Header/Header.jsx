// src/components/Header.jsx
import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src="/assets/images/logo-hds.png" alt="" />
      </Link>
      {/* <div className={styles.connexion}>
        <Link to="/login" className={styles.login}>Connexion</Link>
        <Link to="/register" className={styles.signup}>Inscription</Link>
      </div> */}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className={styles.container__profil}>
            <div className={styles.container__profil__img}>
              <img className={styles.pp} src="/assets/images/pp.png" alt="" />
            </div>
            <div className={styles.container__profil__infos}>
              <p className={styles.container__profil__infos__name}>User</p>
              <p className={styles.container__profil__infos__email}>
                user@gmail.com
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={styles.dropdown}>
          <DropdownMenuItem>Mon profil</DropdownMenuItem>
          <DropdownMenuItem>Mes dépots</DropdownMenuItem>
          <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default Header;
