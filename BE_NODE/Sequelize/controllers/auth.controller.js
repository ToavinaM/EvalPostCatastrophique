import { models } from '../models/index.js'; // ✅ Importe `models`
const { User } = models; // ✅ Récupère `User` depuis `models`

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Inscription
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Création de l'utilisateur
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Connexion
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Connexion réussie', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
