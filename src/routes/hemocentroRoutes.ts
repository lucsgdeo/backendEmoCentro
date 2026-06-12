import express from 'express';
import * as hemocentroController from '../controllers/hemocentroController';

const router = express.Router();

router.get('/', hemocentroController.getAll);
router.post('/', hemocentroController.create);

export default router;
