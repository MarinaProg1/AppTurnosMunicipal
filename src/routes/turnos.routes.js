const express = require('express');
const router = express.Router();
const {getTurnos, createTurno, deleteTurno, getTurnoById, getPorEspecialidad} = require('../controllers/turnos.controller');

router.get('/', getTurnos);
router.post('/', createTurno);
router.delete('/:id', deleteTurno);
router.get('/especialidad/:especialidad', getPorEspecialidad);
router.delete('/:id', deleteTurno);
router.get('/:id', getTurnoById);
module.exports = router;

