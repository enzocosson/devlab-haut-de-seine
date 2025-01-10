// src/pages/LoginPage.jsx
import React, {useEffect, useState} from "react";
import styles from "./LoginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { checkUserLogin } from "@/pages/LoginPage/LogAPI.jsx";

function LoginPage() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [isRemembered, setIsRemembered] = useState(false);
    const [forgetPassword, setForgetPassword] = useState(false);
    const [emailAccount, setEmailAccount] = useState("");
    const [resetPassword, setResetPassword] = useState(false);

    useEffect(() => {
        let user = localStorage.getItem("@user")
        if (user) {
            user = JSON.parse(user)
            setForm(user)
            setIsRemembered(true)
        }
    }, []);

    const handleCheckboxChange = (event) => {
        setIsRemembered(event.target.checked);
    };

    const checkLogin = async () => {
        setLoading(true);
        try {
            const userLog = await checkUserLogin()
            if (userLog) {
                if (isRemembered) {
                    localStorage.setItem("@user", JSON.stringify(form))
                } else {
                    localStorage.removeItem("@user")
                }
                navigate("/dashboard")
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleChangeEmail = (e) => {
        const { value } = e.target;
        setEmailAccount(value)
    };

    const handlePassword = () => {
        setForgetPassword(!forgetPassword)
        setResetPassword(false)
    }

    const resetMail = () => {
        if (!resetPassword) {
            console.log("Mail for reset password send to", emailAccount)
            setResetPassword(true)
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.hdsLogo}>
                <Link to="/"><img src="/assets/images/logo-hds.png" alt="" /></Link>
            </div>

            <div className={styles.loginCard}>
                <div className={styles.logo}>
                    <img src="/assets/images/logo.png" alt=""/>
                </div>

                { !forgetPassword &&
                    <>
                        <div className={styles.loginForm}>
                            <div className={styles.titleLoginForm}>
                                <h1>Heureux de vous revoir !</h1>
                                <p>Entrez vos informations de connexion</p>
                            </div>

                            <form onSubmit={checkLogin}>
                                <div className={styles.loginInput}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text"
                                           name={"email"}
                                           placeholder={"ex : carole@gmail.fr"}
                                           value={form.email}
                                           onChange={handleChangeForm}
                                           required={true}
                                    />
                                </div>
                                <div className={styles.loginInput}>
                                    <label htmlFor="email">Mot de passe</label>
                                    <input type="password"
                                           name={"password"}
                                           placeholder={"Entrez votre mot de passe"}
                                           value={form.password}
                                           onChange={handleChangeForm}
                                           required={true}
                                    />
                                </div>
                                <div className={styles.loginCredential}>
                                    <div className={styles.storeCredential}>
                                        <input type="checkbox"
                                               checked={isRemembered}
                                               onChange={handleCheckboxChange}
                                        />
                                        <p>Se souvenir</p>
                                    </div>
                                    <p className={styles.pointer} onClick={handlePassword}>Mot de passe oublié ?</p>
                                </div>
                                <button type="submit" className={styles.loginButton} disabled={loading}>
                                    {loading ? <CircularProgress/> : "Se connecter"}
                                </button>
                                <div className={styles.googleLoginButton} style={{ cursor: "pointer" }}>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                                        alt="logo_google"/>
                                    Se connecter avec Google
                                </div>
                            </form>
                        </div>

                        <div>
                            Je n'ai pas de compte ? <span><Link to="/register">S'inscrire</Link></span>
                        </div>
                    </>
                }

                { forgetPassword &&
                    <>
                        <div className={styles.loginForm}>
                            <div className={styles.titleLoginForm}>
                                <h1>Mot de passe oublié ?</h1>
                                <p>Réinitialisation du mot de passe</p>
                            </div>

                            <form>
                                <div className={styles.loginInput}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text"
                                           name={"email"}
                                           placeholder={"ex : carole@gmail.fr"}
                                           value={emailAccount}
                                           onChange={handleChangeEmail}
                                           required={true}
                                    />
                                </div>
                                <div onClick={resetMail} className={resetPassword ? styles.resetButton : styles.loginButton}>
                                    {resetPassword ? "Mail envoyé" : "Envoyer le mail"}
                                </div>
                            </form>
                        </div>

                        <p className={styles.pointer} onClick={handlePassword}>
                            Retour à la connexion
                        </p>
                    </>
                }

            </div>

        </main>
    );
}

export default LoginPage;
