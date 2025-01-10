// src/pages/RegisterPage.jsx
import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { fetchCommunes } from "@/pages/LoginPage/LogAPI.jsx";

function RegisterPage() {
  const navigate = useNavigate();

  const [communes, setCommunes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    last_name: "",
    first_name: "",
    city: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCommunes = async () => {
      try {
        const data = await fetchCommunes();
        setCommunes(data.results);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getCommunes();
  }, []);

  const registerUser = (e) => {
    e.preventDefault();
    console.log("Form submitted", form);
    // Add registration logic here (e.g., API call)
    navigate("/dashboard");
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.bg__blur}></div>

      <div className={styles.hdsLogo}>
        <Link to="/">
          <img src="/assets/images/logo-hds.png" alt="" />
        </Link>
      </div>

      <div className={styles.registerCard}>
        <div className={styles.logo}>
          <img src="/assets/images/logo.png" alt="EcoConnect" />
        </div>

        <div className={styles.registerForm}>
          <div className={styles.titleLoginForm}>
            <h1>Bienvenue sur EcoConnect !</h1>
            <p>Entrez vos informations pour créer votre compte</p>
          </div>

          <form onSubmit={registerUser}>
            <div className={styles.fullName}>
              <div className={styles.loginInput}>
                <label htmlFor="last_name">Nom</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="ex : Legrand"
                  value={form.last_name}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className={styles.loginInput}>
                <label htmlFor="first_name">Prénom</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="ex : Carole"
                  value={form.first_name}
                  onChange={handleChangeForm}
                  required
                />
              </div>
            </div>
            <div className={styles.loginInput}>
              <label htmlFor="city">Ville</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChangeForm}
                required
              >
                <option value="">Select a city</option>
                {communes.map((city, index) => (
                  <option key={index} value={city.nom}>
                    {city.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.loginInput}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="ex : carole@gmail.fr"
                value={form.email}
                onChange={handleChangeForm}
                required
              />
            </div>
            <div className={styles.loginInput}>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                value={form.password}
                onChange={handleChangeForm}
                required
              />
            </div>
            <button type="submit" className={styles.loginButton}>
              S'inscrire
            </button>
            <div className={styles.googleLoginButton}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                alt="logo_google"
              />
              S'inscrire avec Google
            </div>
          </form>
        </div>

        <div>
          J'ai un compte ?{" "}
          <span>
            <Link to="/login">Se connecter</Link>
          </span>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
