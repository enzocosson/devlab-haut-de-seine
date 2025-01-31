import React, { useState } from "react";
import styles from "./Profil.module.scss";

function Profil() {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className={styles.profil}>
      <h1>Mon Profil</h1>
      <div className={styles.profileInfo}>
        <label>
          Nom :
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userInfo.name}</span>
          )}
        </label>
        <label>
          Email :
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userInfo.email}</span>
          )}
        </label>
        <label>
          Téléphone :
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userInfo.phone}</span>
          )}
        </label>
      </div>
      <div className={styles.actions}>
        <button onClick={toggleEditing}>
          {isEditing ? "Enregistrer" : "Modifier"}
        </button>
        {isEditing && <button onClick={() => setIsEditing(false)}>Annuler</button>}
      </div>
    </div>
  );
}

export default Profil;
