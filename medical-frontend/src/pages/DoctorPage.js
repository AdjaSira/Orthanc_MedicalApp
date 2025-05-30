import React, { useState, useEffect } from "react";
import axios from "axios";

function DoctorPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer la liste des patients depuis le backend
    setLoading(true);
    axios
      .get("http://localhost:3000/test-orthanc", {
        auth: { username: "admin", password: "passer123" },
      })
      .then((response) => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setError("Erreur de connexion au serveur");
        setLoading(false);
      });
  }, []);

  const handleSelectPatient = async (patientId) => {
    setSelectedPatient(patientId);
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8042/patients/${patientId}/studies`,
        {
          auth: { username: "admin", password: "passer123" },
        }
      );
      setStudies(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des études:", error);
      setError("Erreur lors de la récupération des études");
      setLoading(false);
    }
  };

  const openDICOMViewer = (studyId) => {
    // Pour l'instant, on simule l'ouverture d'un viewer DICOM
    const viewerUrl = `http://localhost:8042/osimis-viewer/app/index.html?study=${studyId}`;
    window.open(viewerUrl, "_blank");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          color: "#2c3e50",
          borderBottom: "2px solid #3498db",
          paddingBottom: "10px",
        }}
      >
        Portail Médecin
      </h1>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#34495e" }}>Rechercher un Patient</h2>

        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ display: "grid", gap: "10px", maxWidth: "400px" }}>
          {patients.map((patientId, index) => (
            <button
              key={index}
              onClick={() => handleSelectPatient(patientId)}
              style={{
                padding: "12px 20px",
                backgroundColor:
                  selectedPatient === patientId ? "#3498db" : "#ecf0f1",
                color: selectedPatient === patientId ? "white" : "#2c3e50",
                border: "1px solid #bdc3c7",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Patient {patientId}
            </button>
          ))}
        </div>
      </div>

      {selectedPatient && (
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #dee2e6",
          }}
        >
          <h2 style={{ color: "#34495e" }}>
            Études DICOM du Patient {selectedPatient}
          </h2>

          {studies.length > 0 ? (
            <div style={{ display: "grid", gap: "15px" }}>
              {studies.map((study, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>Étude {study.ID || study}</strong>
                    <p style={{ margin: "5px 0", color: "#666" }}>
                      Date: {study.MainDicomTags?.StudyDate || "Non spécifiée"}
                    </p>
                    <p style={{ margin: "5px 0", color: "#666" }}>
                      Description:{" "}
                      {study.MainDicomTags?.StudyDescription || "Non spécifiée"}
                    </p>
                  </div>
                  <button
                    onClick={() => openDICOMViewer(study.ID || study)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#27ae60",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Ouvrir Viewer
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                backgroundColor: "white",
                borderRadius: "5px",
                border: "2px dashed #ddd",
              }}
            >
              <p style={{ color: "#666", fontSize: "18px" }}>
                Aucune étude DICOM trouvée pour ce patient
              </p>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          onClick={() => (window.location.href = "/login")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default DoctorPage;
