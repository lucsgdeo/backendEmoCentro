const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const auth = require('../middlewares/auth');

router.get('/', auth, agendamentoController.getAll);
router.post('/', auth, agendamentoController.create);
router.put('/:id', auth, agendamentoController.update);
router.delete('/:id', auth, agendamentoController.delete);

module.exports = router;
