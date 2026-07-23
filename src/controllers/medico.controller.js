const Medico = require('../models/Medico');
const respuestaEstandar = require('../utils/respuestaEstandar');

const getMedicos = async (req, res) => {
    try {
        const medicos = await Medico.find().populate('especialidad').populate('obrasSociales');
        respuestaEstandar(res, 200, medicos);
    } catch (error) {
        respuestaEstandar(res, 500, { message: 'Error al obtener los médicos', error });
    }
};

const createMedico = async (req, res) => {
    try {
        const nuevoMedico = await Medico.create(req.body);  
        return respuestaEstandar(res, 201, nuevoMedico);
    } catch (error) {

         if (error.name === 'ValidationError') {
                    const errores = Object.values(error.errors).map(err => err.message);
        
                    return respuestaEstandar(res, 400, false, 'Error de validación', errores);
                }
        return  respuestaEstandar(res, 500, { message: 'Error al crear el médico', error });
    }
};

module.exports = {
    getMedicos,
    createMedico
};
 