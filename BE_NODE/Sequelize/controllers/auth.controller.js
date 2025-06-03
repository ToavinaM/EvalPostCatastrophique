import { models } from '../models/index.js';
const { User } = models;

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../classe/AppError.js';

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

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return next(new AppError('Utilisateur non trouvé', 404));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new AppError('Mot de passe incorrect', 400));

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            message: 'Connexion réussie',
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
            },
        });

    } catch (err) {
        console.log("==============>>>>",err);
        
        next(err);
    }
  };
