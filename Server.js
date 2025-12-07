const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Inspecteur IA en ligne 🚀");
});

app.get("/api/test", (req, res) => {
    res.json({ message: "API opérationnelle ✔" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Serveur lancé sur le port " + port));