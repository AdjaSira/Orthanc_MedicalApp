import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, UserPlus, Activity } from "lucide-react";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "patient",
    phone: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // Logique de connexion
      if (formData.email && formData.password) {
        // Simulation de la connexion
        localStorage.setItem("userRole", formData.role);
        localStorage.setItem("userEmail", formData.email);

        switch (formData.role) {
          case "patient":
            navigate("/patient");
            break;
          case "medecin":
            navigate("/doctor");
            break;
          case "secretaire":
            navigate("/secretary");
            break;
          case "chercheur":
            navigate("/researcher");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            navigate("/patient");
        }
      } else {
        setError("Veuillez remplir tous les champs");
      }
    } else {
      // Logique d'inscription
      if (formData.password !== formData.confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password
      ) {
        setError("Veuillez remplir tous les champs obligatoires");
        return;
      }

      // Simulation de l'inscription
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setIsLogin(true);
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Activity
            size={48}
            color="#667eea"
            style={{ marginBottom: "10px" }}
          />
          <h1
            style={{
              color: "#2d3748",
              marginBottom: "5px",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            MediCare+
          </h1>
          <p style={{ color: "#718096", fontSize: "16px" }}>
            {isLogin ? "Connectez-vous à votre compte" : "Créez votre compte"}
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fed7d7",
              color: "#c53030",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div
                style={{ display: "flex", gap: "15px", marginBottom: "20px" }}
              >
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      color: "#4a5568",
                      fontWeight: "500",
                    }}
                  >
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "16px",
                      boxSizing: "border-box",
                    }}
                    required={!isLogin}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      color: "#4a5568",
                      fontWeight: "500",
                    }}
                  >
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "16px",
                      boxSizing: "border-box",
                    }}
                    required={!isLogin}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#4a5568",
                    fontWeight: "500",
                  }}
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#4a5568",
                    fontWeight: "500",
                  }}
                >
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#4a5568",
                fontWeight: "500",
              }}
            >
              <User
                size={16}
                style={{ display: "inline", marginRight: "5px" }}
              />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#4a5568",
                fontWeight: "500",
              }}
            >
              <Lock
                size={16}
                style={{ display: "inline", marginRight: "5px" }}
              />
              Mot de passe *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#4a5568",
                  fontWeight: "500",
                }}
              >
                Confirmer le mot de passe *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
                required={!isLogin}
              />
            </div>
          )}

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#4a5568",
                fontWeight: "500",
              }}
            >
              Type de compte
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                backgroundColor: "white",
                boxSizing: "border-box",
              }}
            >
              <option value="patient">Patient</option>
              <option value="medecin">Médecin</option>
              <option value="secretaire">Secrétaire médicale</option>
              <option value="chercheur">Chercheur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "20px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#5a67d8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#667eea")}
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "#667eea",
              cursor: "pointer",
              fontSize: "14px",
              textDecoration: "underline",
            }}
          >
            {isLogin ? (
              <>
                <UserPlus
                  size={16}
                  style={{ display: "inline", marginRight: "5px" }}
                />
                Pas de compte ? S'inscrire
              </>
            ) : (
              "Déjà un compte ? Se connecter"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
