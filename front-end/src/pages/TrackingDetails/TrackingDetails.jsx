import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./TrackingDetails.module.scss";

function TrackingDetails() {
    const { trackingNumber } = useParams();

  // Données fictives pour les étapes de transit
  const initialSteps = [
    { id: 1, status: "Réceptionné au point relais", completed: false },
    { id: 2, status: "En transit vers le centre de tri", completed: false },
    { id: 3, status: "Arrivé au centre de tri", completed: false },
    { id: 4, status: "Expédié vers la destination finale", completed: false },
    { id: 5, status: "Livré", completed: false },
  ];
  
  const [logged, setLogged] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [trackingSteps, setTrackingSteps] = useState(initialSteps);
  const [refresh, setRefresh] = useState(false);

  const forceReload = () => {
    setRefresh((prev) => !prev); // Change la valeur pour déclencher un re-render
  };


  useEffect(() => {
      setLogged(false);
      const token = localStorage.getItem("token");
      if (token)
        try {
          setLogged(true);
          fetchLog();
          console.log(trackingSteps);
        } catch (error) {
          console.error("Erreur lors du décodage du token:", error);
          setLogged(false);
        }
      else navigate("/login");
    }, []);
  
    const [log, setLog] = useState([]);
    const fetchLog = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/api/logs/${trackingNumber}"`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        const data = await response.json();
        setLog(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du depot :",
          error
        );
      }
    };

  useEffect(() => {
    let increment = 0
    switch(log.action){
      case "relayPoint":
        increment = 1;
        break;
      case "transitSortingCenter":
        increment = 2;
        break;
      case "sortingCenter":
        increment = 3;
        break;
      case "finalTransit":
        increment = 4;
        break;
      case "delivered":
        increment = 5;
        break;
    }

    setTrackingSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id == increment && !step.completed
          ? {
              ...step,
              completed: true,
            }
          : step
      )
    );
    forceReload();

  }, []);

  //relayPoint
  //transitSortingCenter
  //sortingCenter
  //finalTransit
  //delivered

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
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackingDetails;
