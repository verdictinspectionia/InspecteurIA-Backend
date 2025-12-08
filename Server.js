lconst express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🧠 Mémoire simple : tout est stocké ici tant que le serveur tourne
let inspections = [];

// 🌐 Route racine
app.get("/", (req, res) => {
  res.send("Backend Inspecteur IA en ligne 🚀");
});

// ✅ Route test
app.get("/api/test", (req, res) => {
  res.json({ message: "API opérationnelle ✔" });
});

// 🩺 Route ping (pour Render)
app.get("/ping", (req, res) => {
  res.send("pong");
});

// ✍️ Créer une inspection (POST)
app.post("/api/inspect", (req, res) => {
  const { texte, source } = req.body;

  if (!texte) {
    return res
      .status(400)
      .json({ error: "Le champ 'texte' est obligatoire." });
  }

  const inspection = {
    id: inspections.length + 1,
    texte,
    source: source || null,
    createdAt: new Date().toISOString(),
  };

  inspections.push(inspection);

  res.status(201).json({
    message: "Inspection enregistrée en mémoire ✅",
    inspection,
  });
});

// 📥 Récupérer toutes les inspections (GET)
app.get("/api/inspect", (req, res) => {
  res.json({
    count: inspections.length,
    inspections,
  });
});

// === ROUTE IA : CHAT ===
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }

  res.json({
    reply: "Voici une réponse IA (on pourra améliorer avec OpenAI)"
  });
});

// === ROUTE IA : INSPECT ANALYSE ===
app.post("/api/inspect/ai", async (req, res) => {
  const { texte } = req.body;

  if (!texte) {
    return res.status(400).json({ error: "Texte manquant" });
  }

  res.json({
    analyse: "Analyse IA basée sur : " + texte
  });
});

// 🚀 Lancer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Serveur lancé sur le port", port);
});
