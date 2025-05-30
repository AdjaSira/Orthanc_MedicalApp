const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API pour l'application médicale");
});

app.get("/test-orthanc", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8042/patients", {
      auth: { username: "admin", password: "passer" },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Erreur de connexion à Orthanc : " + error.message);
  }
});

app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
