const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Sert automatiquement les fichiers (index.html)
app.use(express.static(__dirname));

let inspections = [];

// ➜ Ajouter une inspection
app.post("/api/inspect", (req, res) => {
  const { texte, source } = req.body;

  if (!texte || texte.trim() === "") {
    return res.status(400).json({ error: "Le texte est obligatoire." });
  }

  const nouvelleInspection = {
    id: inspections.length + 1,
    texte,
    source: source || "inconnue",
    date: new Date().toISOString(),
    analyse: "Analyse IA basée sur : " + texte
  };

  inspections.push(nouvelleInspection);

  res.json(nouvelleInspection);
});

// ➜ Obtenir toutes les inspections
app.get("/api/inspect", (req, res) => {
  res.json({
    count: inspections.length,
    inspections
  });
});

// ➜ Servir index.html quand on visite le site
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ➜ Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Serveur lancé sur le port " + port);
});
