// Exemple dans medical-app/index.js
app.get("/patient/profile", (req, res) => {
  const email = req.query.email;
  // Logique pour récupérer les données du patient depuis la base de données
  res.json({
    firstName: "Jean",
    lastName: "Dupont",
    email: email,
    phone: "06 12 34 56 78",
    dateOfBirth: "1985-03-15",
    address: "123 Rue de la Santé, 75013 Paris",
  });
});

app.get("/patient/medical-record", (req, res) => {
  const email = req.query.email;
  // Logique pour récupérer le dossier médical
  res.json({
    prescriptions: [
      {
        id: 1,
        date: "2025-05-25",
        doctor: "Dr. Martin",
        medications: [
          "Paracétamol 500mg - 3x/jour",
          "Ibuprofène 200mg - 2x/jour",
        ],
        duration: "7 jours",
        notes: "Traitement pour douleurs articulaires",
      },
    ],
    reports: [
      {
        id: 1,
        date: "2025-05-25",
        type: "Consultation générale",
        doctor: "Dr. Martin",
        summary: "Patient en bonne santé générale.",
        details: "Examen clinique normal.",
      },
    ],
    examResults: [
      {
        id: 1,
        date: "2025-05-15",
        type: "Analyse de sang",
        status: "Terminé",
        results: "Normaux",
      },
    ],
    dicomImages: [
      {
        id: "1.2.840.113619.2.5.1762583153.215519.978957063.78",
        type: "Radiographie",
        date: "2025-05-10",
        description: "Radiographie du thorax",
      },
    ],
  });
});

app.get("/patient/appointments", (req, res) => {
  const email = req.query.email;
  // Logique pour récupérer les rendez-vous
  res.json({
    upcoming: [
      {
        id: 1,
        date: "2025-06-05",
        time: "14:30",
        doctor: "Dr. Martin",
        specialty: "Médecine générale",
        location: "Cabinet médical - 45 Rue Victor Hugo",
        status: "Confirmé",
        type: "Consultation de suivi",
      },
    ],
    history: [
      {
        id: 3,
        date: "2025-05-25",
        time: "10:00",
        doctor: "Dr. Martin",
        specialty: "Médecine générale",
        status: "Terminé",
        type: "Consultation générale",
      },
    ],
  });
});
