import React, { useState, useRef } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  Link,
} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom"; 
import { Settings, Package, UserPen, LogOut, MapPin } from "lucide-react";

import styles from "./Map.module.scss";

function Dashboard() {
  const mapRef = useRef();
  const navigate = useNavigate(); // Hook pour la navigation
  const [pointsRelais, setPointsRelais] = useState([
    {
      id: 1,
      name: "Mairie de Boulogne-Billancourt",
      lat: 48.8397,
      lng: 2.2399,
    },
    { id: 2, name: "Mairie de Nanterre", lat: 48.8925, lng: 2.2067 },
    { id: 3, name: "Mairie de Courbevoie", lat: 48.8977, lng: 2.2567 },
    { id: 4, name: "Mairie de Colombes", lat: 48.9226, lng: 2.254 },
    { id: 5, name: "Mairie de Rueil-Malmaison", lat: 48.8779, lng: 2.1799 },
    { id: 6, name: "Mairie de Clamart", lat: 48.7988, lng: 2.2667 },
    { id: 7, name: "Mairie d’Issy-les-Moulineaux", lat: 48.822, lng: 2.2772 },
    { id: 8, name: "Mairie de Suresnes", lat: 48.8714, lng: 2.2295 },
    { id: 9, name: "Mairie de Levallois-Perret", lat: 48.893, lng: 2.288 },
    { id: 10, name: "Mairie de Meudon", lat: 48.8133, lng: 2.2384 },
    { id: 11, name: "Mairie de Test", lat: 49.8133, lng: 2.2384 },
  ]);

  const [selectedPoint, setSelectedPoint] = useState(null);

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    const map = mapRef.current;
    if (map) {
      map.flyTo([point.lat, point.lng], 15, { duration: 1.5 });
    }
  };

  const handleDepositClick = () => {
    if (selectedPoint) {
      navigate(`/formulaire?mairie=${encodeURIComponent(selectedPoint.name)}`);
    }
  };

  const location = useLocation();

  return (
    <>
      <nav className={styles.slidebar}>
        <div className={styles.container__list}>
            {pointsRelais.map((point) => (
              <div
                key={point.id}
                onClick={() => handlePointClick(point)}
                className={`${styles.pointItem} ${
                  selectedPoint?.id === point.id ? styles.selectedPoint : ""
                }`}
              >
                {point.name}
              </div>
            ))}
        </div>
      </nav>

      <div className={styles.map}>
        {" "}
        {selectedPoint && (
          <button className={styles.depositButton} onClick={handleDepositClick}>
            Déposer ici
          </button>
        )}
        <MapContainer
          center={[48.8397, 2.2399]}
          zoom={13}
          style={{
            height: "100%",
            width: "100%",
            zIndex: 0,
            borderRadius: 20,
          }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pointsRelais.map((point) => (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              eventHandlers={{
                click: () => setSelectedPoint(point),
              }}
            >
              <Popup>{point.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default Dashboard;
