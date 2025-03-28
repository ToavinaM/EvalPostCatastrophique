const express = require("express");
const cors = require("cors");
const db = require("./utils/db");

const app = express();
app.use(express.json());
app.use(cors());

// Route test
app.get("/", (req, res) => {
    res.send("🚀 API Livraison Blockchain en ligne !");
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));
