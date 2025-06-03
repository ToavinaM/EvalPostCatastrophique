import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import livraisonRoutes from './routes/livraison.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// ✅ Middleware pour accepter du JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ Connexion et synchronisation DB
try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie');
    await sequelize.sync({ alter: true }); // ou { force: true }
    console.log('✅ Base de données synchronisée');
} catch (error) {
    console.error('❌ Erreur de connexion/synchronisation :', error);
}

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/livraisons', livraisonRoutes);
app.use('/upload', uploadRoutes);
// Rendre le dossier `uploads` accessible
app.use('/uploads', express.static('uploads'));

// ✅ Gestion des erreurs
app.use(errorHandler);

// ✅ Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
