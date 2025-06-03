// routes/upload.routes.js
import express from 'express';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.post('/image', upload.single('image'), (req, res) => {
    // `image` est le nom du champ du fichier dans Postman
    if (!req.file) {
        return res.status(400).json({ message: 'Aucun fichier envoyé' });
    }

    res.status(200).json({
        message: 'Fichier uploadé avec succès',
        file: req.file.filename,
        path: `/uploads/${req.file.filename}`,
    });
});

export default router;
