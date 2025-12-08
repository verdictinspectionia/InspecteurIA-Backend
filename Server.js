const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let inspections = [];

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

app.get("/api/inspect", (req, res) => {
  res.json({
    count: inspections.length,
    inspections
  });
});

app.get("/", (req, res) => {
  res.send("Backend InspecteurIA opérationnel 🚀");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Serveur lancé sur le port " + port);
});
