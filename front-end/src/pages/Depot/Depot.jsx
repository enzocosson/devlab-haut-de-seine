import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Depot.module.scss";

function Depot() {
  // Données fictives pour les dépôts
  const [depots, setDepots] = useState([
    {
      id: 1,
      trackingNumber: "123456789",
      name: "Ordinateur Portable",
      photo: "https://via.placeholder.com/100",
      description: "Ordinateur Dell à recycler",
      location: "Mairie de Boulogne-Billancourt",
    },
    {
      id: 2,
      trackingNumber: "987654321",
      name: "Clavier",
      photo: "https://via.placeholder.com/100",
      description: "Clavier mécanique défectueux",
      location: "Mairie de Courbevoie",
    },
    {
      id: 3,
      trackingNumber: "1122334455",
      name: "Téléphone",
      photo: "https://via.placeholder.com/100",
      description: "Téléphone Samsung à donner",
      location: "Mairie de Nanterre",
    },
  ]);

  return (
    <div className={styles.depot}>
      <h1>Mes Dépôts</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Numéro de Suivi</th>
            <th>Nom</th>
            <th>Photo</th>
            <th>Description</th>
            <th>Lieu de Dépôt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {depots.map((depot) => (
            <tr key={depot.id}>
              <td>{depot.trackingNumber}</td>
              <td>{depot.name}</td>
              <td>
                <img src={depot.photo} alt={depot.name} />
              </td>
              <td>{depot.description}</td>
              <td>{depot.location}</td>
              <td>
                <Link to={`/dashboard/tracking/${depot.trackingNumber}`} className={styles.button}>
                  Suivre le Suivi
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
