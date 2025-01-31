import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
import styles from "./Confirmation.module.scss";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { qrCodeData } = location.state || {};

  // Réduire la taille des données du QR code
  const minimalQrData = JSON.stringify({
    userId: qrCodeData?.userId,
    materialName: qrCodeData?.materialName,
    materialType: qrCodeData?.materialType,
    description: qrCodeData?.description,
    mairie: qrCodeData?.mairie,
    photos: qrCodeData?.photos?.map(photo => photo.url) // Ne garder que les URLs des images
  });

  const handleRedirection = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.confirmation}>
      <div className={styles.container}>
        <h1>Merci pour votre envoi !</h1>
        <p>
          Votre demande concernant le matériel "<span>{qrCodeData?.materialName}</span>" a été enregistrée avec succès.
        </p>
        <p>Présentez ce QR code à la mairie : <span>{qrCodeData?.mairie}</span></p>
        <div className={styles.qrCode}>
          <QRCodeSVG value={minimalQrData} size={200} />
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={handleRedirection} className={styles.button}>
            Proposer un autre dépôt
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;