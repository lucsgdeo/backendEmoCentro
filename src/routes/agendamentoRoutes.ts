import express from 'express';
import * as agendamentoController from '../controllers/agendamentoController';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/', auth as any, agendamentoController.getAll as any);
router.post('/', auth as any, agendamentoController.create as any);
router.put('/:id', auth as any, agendamentoController.update as any);
router.delete('/:id', auth as any, agendamentoController.remove as any);

export default router;
