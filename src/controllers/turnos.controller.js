const Turno = require('../models/Turno');
const respuestaEstandar = require('../utils/respuestaEstandar');

const getTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find().populate('paciente');

        return respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnos);

    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al obtener los turnos', error.message);
    }
};

const createTurno = async (req, res) => {
    try {
        const nuevoTurno = await Turno.create(req.body);

        return respuestaEstandar(res, 201, true, 'Turno creado exitosamente', nuevoTurno);

    } catch (error) {

        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);

            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }

        return respuestaEstandar(res, 500, false, 'Error al crear el turno', error.message);
    }
};

const getTurnoById = async (req, res)=>{
    try {
        const { id } = req.params;
        const turno = await Turno.findById(id).populate('paciente');
        if (!turno) {
            return respuestaEstandar(res, 404, false, 'Turno no encontrado');
        }
        respuestaEstandar(res, 200, true, 'Turno encontrado', turno);
        
    } catch (error) {
         if(error.name === 'ValidationError'){
            const errores = Object.values(error.errors).map(err => err.message);
            respuestaEstandar(res, 400, false, 'Error de validación', errores);
        
        }
         return respuestaEstandar(res, 500, false, 'Error al eliminar el turno ', error.message);
    }
};
    
const deleteTurno = async (req, res)=>{
    try {
        const { id } = req.params;
        const turno = await Turno.findByIdAndDelete(id);
        if (!turno) {
            return respuestaEstandar(res, 404, false, 'Turno no encontrado');
        }
        returnrespuestaEstandar(res, 200, true, 'Turno eliminado correctamente', turno);
    } catch (error) {
       
        return respuestaEstandar(res, 400 , false, 'Error al eliminar el turno', error.message);
    }
};

const getPorEspecialidad = async (req, res) => {
    try {
        const { especialidad } = req.params;
        const turnos = await Turno.find({ especialidad: especialidad });

        respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnos);

    } catch (error) {

        if(error.name === 'ValidationError'){
            const errores = Object.values(error.errors).map(err => err.message);
            respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }
        respuestaEstandar(res, 500, false, 'Error al obtener los turnos por especialidad', error.message);
    }
};

const getTurnosPorFecha = async (req, res) => {
    try {
        const { fechaTurno } = req.params;
        const turnos = await Turno.find({ fecha: fechaTurno })
                                      .populate('paciente')
                                      .populate('especialidad') ;
        return respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnos);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al obtener los turnos por fecha', error.message);
    }
};

module.exports = {
    getTurnos,
    getTurnoById,
    createTurno,
    deleteTurno,
    getPorEspecialidad,
    getTurnosPorFecha
};  
