import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import config from '../config/database.js';

const env = process.env.NODE_ENV;
console.log("Env==========>",env);

const dbConfig = config[env];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation de Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  logging: false,
});

const models = {};

// Charger tous les fichiers modèles du dossier
const files = fs.readdirSync(__dirname).filter(file =>
  file.endsWith('.js') && file !== 'index.js'
);

for (const file of files) {
  const module = await import(path.join(__dirname, file));
  const ModelClass = module.default; // 🔥 Récupérer l'export par défaut

  if (typeof ModelClass?.init === 'function') { // ✅ Vérifier que c'est bien une classe Sequelize
    const model = ModelClass.init(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  } else {
    console.error(`⚠️  ${file} n'exporte pas une classe Sequelize valide.`);
  }
}

// Appliquer les associations entre modèles si définies
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});
// 🔄 Synchroniser la base de données
try {
  await sequelize.sync({ alter: true }); // ou { force: true } pour réinitialiser les tables
  console.log('✅ Base de données synchronisée avec succès.');
} catch (error) {
  console.error('❌ Erreur lors de la synchronisation de la base de données :', error);
}

export { sequelize, models };
