const express = require('express');
const router = express.Router();
const hemocentroController = require('../controllers/hemocentroController');
const auth = require('../middlewares/auth');

router.get('/', hemocentroController.getAll);
router.post('/', auth, hemocentroController.create);

module.exports = router;
