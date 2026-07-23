const express = require('express');
const router = express.Router();
const { getObrasSociales, createObraSocial } = require('../controllers/obraSocial.controller'); 


router.get('/', getObrasSociales);
router.post('/', createObraSocial);
 

module.exports = router;