const express = require('express');
const router = express.Router();
const {getTurnos, createTurno, deleteTurnos, getPorEspecialidad} = require('../controllers/turnos.controller');

router.get('/', getTurnos);
router.post('/', createTurno);
router.delete('/:id', deleteTurnos);
router.get('/especialidad/:especialidad', getPorEspecialidad);

module.exports = router;

