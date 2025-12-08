const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ----- MÉMOIRE SIMPLE -----
let inspections = [];

// ----- Route racine -----
app.get("/", (req, res) => {
  res.send("Backend Inspecteur IA opérationnel 🚀");
});

// ----- Route test -----
app.get("/api/test", (req, res) => {
  res.json({ message: "API opérationnelle ✔️" });
});

// ----- Route ping -----
app.get("/ping", (req, res) => {
  res.send("pong");
});

// ----- Ajouter une inspection -----
app.post("/api/inspect", (req, res) => {
  const { texte, source } = req.body;

  if (!texte) {
    return res.status(400).json({ error: "Le texte est obligatoire" });
  }

  const inspection = {
    id: inspections.length + 1,
    texte,
    source: source || null,
    createdAt: new Date().toISOString(),
  };

  inspections.push(inspection);

  res.status(201).json({
    message: "Inspection enregistrée",
    inspection,
  });
});

// ----- Récupérer toutes les inspections -----
app.get("/api/inspect", (req, res) => {
  res.json({
    count: inspections.length,
    inspections,
  });
});

// ----- IA : Chat -----
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }

  res.json({
    reply: "Voici une réponse IA (placeholder)",
  });
});

// ----- IA : Analyse -----
app.post("/api/inspect/ai", (req, res) => {
  const { texte } = req.body;

  if (!texte) {
    return res.status(400).json({ error: "Texte manquant" });
  }

  res.json({
    analyse: "Analyse IA basée sur : " + texte,
  });
});

// ----- Lancer serveur -----
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Serveur lancé sur le port " + port);
});
