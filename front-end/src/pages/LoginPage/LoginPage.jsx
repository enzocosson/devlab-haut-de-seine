// src/pages/LoginPage.jsx
import React from "react";
import styles from "./LoginPage.module.scss";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main className={styles.main}>
        <div className={styles.hdsLogo}>
            <Link to="/"><img src="/assets/images/logo-hds.png" alt="" /></Link>
        </div>

        <div className={styles.loginCard}>
            <div className={styles.logo}>
                <img src="/assets/images/logo.png" alt=""/>
            </div>

            <div className={styles.loginForm}>
                <div className={styles.titleLoginForm}>
                    <h1>Heureux de vous revoir !</h1>
                    <p>Entrez vos informations de connexion</p>
                </div>

                <form action="">
                    <div className={styles.loginInput}>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder={"ex : carole@gmail.fr"}/>
                    </div>
                    <div className={styles.loginInput}>
                        <label htmlFor="email">Mot de passe</label>
                        <input type="password" placeholder={"Entrez votre mot de passe"}/>
                    </div>
                    <div className={styles.loginCredential}>
                        <div className={styles.storeCredential}>
                            <input type="checkbox"/>
                            <p>Se souvenir</p>
                        </div>
                        <p>Mot de passe oublié ?</p>
                    </div>
                    <div className={styles.loginButton}>Se connecter</div>
                    <div className={styles.googleLoginButton}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt=""/>
                        Se connecter avec Google</div>
                </form>
            </div>

            <div>
                Je n'ai pas de compte ? <span><Link to="/register">S'inscrire</Link></span>
            </div>
        </div>
    </main>
  );
}

export default LoginPage;
