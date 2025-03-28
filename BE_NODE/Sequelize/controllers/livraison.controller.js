import { models } from '../models/index.js';

const { Livraison } = models;  // ✅ Récupération du modèle Livraison

// Récupérer toutes les livraisons
export const getAllLivraisons = async (req, res) => {
    try {
        const livraisons = await Livraison.findAll();
        res.json(livraisons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer une nouvelle livraison
export const createLivraison = async (req, res) => {
    try {
        const { client, adresse, statut } = req.body;
        const livraison = await Livraison.create({ client, adresse, statut });
        res.status(201).json(livraison);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
