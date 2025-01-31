import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TrackingDetails.module.scss";

function TrackingDetails() {
  const { trackingNumber } = useParams();

  // Données fictives pour les étapes de transit
  const initialSteps = [
    { id: 1, status: "Réceptionné au point relais", date: "2025-01-08 10:00", completed: false },
    { id: 2, status: "En transit vers le centre de tri", date: "2025-01-08 14:30", completed: false },
    { id: 3, status: "Arrivé au centre de tri", date: "2025-01-08 18:00", completed: false },
    { id: 4, status: "Expédié vers la destination finale", date: "2025-01-09 08:45", completed: false },
    { id: 5, status: "Livré", date: "2025-01-09 15:30", completed: false },
  ];

  const [trackingSteps, setTrackingSteps] = useState(initialSteps);

  const handleStepChange = (id) => {
    setTrackingSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id - 1 && !step.completed
          ? {
              ...step,
              completed: true,
            }
          : step
      )
    );
  };

  return (
    <div className={styles.trackingDetails}>
      <h1>Suivi du Dépôt</h1>
      <p>Numéro de Suivi : <strong>{trackingNumber}</strong></p>

      <div className={styles.timeline}>
        {trackingSteps.map((step) => (
          <div key={step.id} className={styles.stepContainer}>
            <div
              className={`${styles.step} ${step.completed ? styles.completed : ""}`}
            >
              <div className={styles.circle}></div>
              <div className={styles.status}>{step.status}</div>
            </div>
            <div className={styles.date}>{step.date}</div>
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        {trackingSteps.map((step) => (
          <div key={step.id}>
            <button
              onClick={() => handleStepChange(step.id)}
              disabled={step.completed || step.id === 1 && !trackingSteps[0].completed}
              className={styles.button}
            >
              Avancer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackingDetails;
