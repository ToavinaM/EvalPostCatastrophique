import { Router } from 'express';
import * as LivraisonController from '../controllers/livraison.controller.js';

const router = Router();

router.get('/', LivraisonController.getAllLivraisons);
router.post('/', LivraisonController.createLivraison);

export default router;
