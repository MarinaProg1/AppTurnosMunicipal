const Especialidad = require('../models/Especialidad');
const respuestaEstandar = require('../utils/respuestaEstandar');

const getEspecialidades = async (req, res) => { 
    try {
        const especialidades = await Especialidad.find();
        return respuestaEstandar(res, 200, true, 'Especialidades obtenidas exitosamente', especialidades);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al obtener las especialidades', error.message);
    }   
};

const createEspecialidad = async (req, res) => {    
    try {   
        const nuevaEspecialidad = await Especialidad.create(req.body);
        return respuestaEstandar(res, 201, true, 'Especialidad creada exitosamente', nuevaEspecialidad);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }   
        return respuestaEstandar(res, 500, false, 'Error al crear la especialidad', error.message);
    }
};
module.exports = {
    getEspecialidades,
    createEspecialidad
};