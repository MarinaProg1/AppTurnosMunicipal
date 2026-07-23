const ObraSocial = require('../models/ObraSocial');
const respuestaEstandar = require('../utils/respuestaEstandar');    

const getObrasSociales = async (req, res) => {
    try {
        const obrasSociales = await ObraSocial.find();  
        return respuestaEstandar(res, 200, true, 'Obras sociales obtenidas exitosamente', obrasSociales);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al obtener las obras sociales', error.message);
    }   
};

const createObraSocial = async (req, res) => {
    try {
        const nuevaObraSocial = await ObraSocial.create(req.body);      
        return respuestaEstandar(res, 201, true, 'Obra social creada exitosamente', nuevaObraSocial);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }   
        return respuestaEstandar(res, 500, false, 'Error al crear la obra social', error.message);
    }   
};

const deleteObraSocial = async (req, res) => {
    try {
        const obraSocialEliminada = await ObraSocial.findByIdAndDelete(req.params.id);
        if (!obraSocialEliminada) {
            return respuestaEstandar(res, 404, false, 'Obra social no encontrada', null);
        }
        return respuestaEstandar(res, 200, true, 'Obra social eliminada exitosamente', obraSocialEliminada);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al eliminar la obra social', error.message);
    }
};  

module.exports = {
    getObrasSociales,
    createObraSocial,
    deleteObraSocial
};