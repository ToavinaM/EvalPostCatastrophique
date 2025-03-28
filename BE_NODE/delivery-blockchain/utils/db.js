const pgp = require("pg-promise")();
require("dotenv").config();

const db = pgp(process.env.DATABASE_URL);

db.connect()
    .then(() => console.log("✅ PostgreSQL connecté"))
    .catch((err) => console.error("❌ Erreur de connexion PostgreSQL", err));

module.exports = db;
