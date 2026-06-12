import express from 'express';
import * as hemocentroController from '../controllers/hemocentroController';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/', hemocentroController.getAll);
router.post('/', auth as any, hemocentroController.create);

export default router;
