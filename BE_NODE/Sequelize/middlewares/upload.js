// middlewares/upload.js
import multer from 'multer';
import path from 'path';

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // dossier où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, uniqueName);
    }
});

// Filtrer les types de fichiers si nécessaire
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // autoriser les images uniquement
    } else {
        cb(new Error('Format de fichier non supporté'), false);
    }
};

export const upload = multer({ storage, fileFilter });
