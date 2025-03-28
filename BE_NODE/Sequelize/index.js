import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import livraisonRoutes from './routes/livraison.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.routes.js'; // 🔥 Ajoute cette ligne



const app = express();
app.use(cors());
app.use(json());

// Vérification de la connexion DB
sequelize.authenticate()
.then(() => console.log('✅ Connexion à PostgreSQL réussie'))
.catch(err => console.error('❌ Erreur de connexion:', err));

// Routes
app.use('/livraisons', livraisonRoutes);
app.use('/auth', authRoutes);
// Gestion globale des erreurs
app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
