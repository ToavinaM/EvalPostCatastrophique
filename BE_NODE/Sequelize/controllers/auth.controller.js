import { models } from '../models/index.js';
const { User } = models;

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 🔐 Inscription
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        
        
        console.log({ username, email, password });

        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Hache le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crée l'utilisateur
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔑 Connexion
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Recherche de l'utilisateur
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérifie le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        // Génère un token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Connexion réussie',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
