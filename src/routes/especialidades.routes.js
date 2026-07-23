const express = require('express');
const router = express.Router();
const { getMedicos, createMedico, deleteMedico } = require('../controllers/medico.controller'); 

router.get('/', getMedicos);
router.post('/', createMedico);
router.delete('/:id', deleteMedico);

module.exports = router;