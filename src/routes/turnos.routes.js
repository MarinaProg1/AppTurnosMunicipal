const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/turnos.controller');

router.get('/', turnosController.getTurnos);
router.get('/especialidad/:especialidad', turnosController.getPorEspecialidad);
router.post('/', turnosController.createTurno);
router.delete('/:id', turnosController.deleteTurnos);

module.exports = router;

