import express from 'express';
import * as agendamentoController from '../controllers/agendamentoController';

const router = express.Router();

router.get('/', agendamentoController.getAll as any);
router.post('/', agendamentoController.create as any);
router.put('/:id', agendamentoController.update as any);
router.delete('/:id', agendamentoController.remove as any);

export default router;
