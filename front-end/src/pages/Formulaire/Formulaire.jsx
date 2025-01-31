import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Formulaire.module.scss";

function Formulaire() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const mairie = searchParams.get("mairie");

  const userId = "123456"; // Remplace ceci par la vraie récupération de l'ID utilisateur

  const [formData, setFormData] = useState({
    materialName: "",
    materialType: "",
    description: "",
  });

  const [photos, setPhotos] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const qrCodeData = {
      userId,
      mairie,
      ...formData,
      photos,
    };

    console.log("Form data submitted:", qrCodeData);

    navigate("/confirmation", { state: { qrCodeData } });
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

          <form onSubmit={handleSubmit} className={styles.formSection}>
            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
              <select
                id="materialType"
                name="materialType"
                value={formData.materialType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Type de matériel
                </option>
                <option value="ordinateur">Ordinateur</option>
                <option value="imprimante">Imprimante</option>
                <option value="ecran">Écran</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <textarea
                id="description"
                name="description"
                placeholder="Description du matériel"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.mapSection}>
              <div className={styles.mapContainer}>
                <iframe
                  title="Carte localisation"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    mairie
                  )}&output=embed`}
                  className={styles.map}
                ></iframe>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Formulaire;
