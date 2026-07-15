const Turno = require('../models/Turno');

let turnos= [
    {id:1, paciente: "Juan Perez", dni:"43567890", especialidad:"cardiología"},
    {id:2, paciente: "Ramon Looss", dni:"40367890", especialidad:"pediatría"},
    {id:3, paciente: "Lucia Rodriguez", dni:"33507890", especialidad:"oncología"},
    {id:4, paciente: "Marcela Crass", dni:"23227890", especialidad:"dentista"},
]

const respuestaEstandar = (res, status, success, message, data = null)=>{
    return res.status(status).json({
        success,
        timetamp: new Date().toISOString(),
        message,
        total: Array.isArray(data) ? data.length : data ? 1:0,
        data
    });
};



const getTurnos = (req, res)=>{
    respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnos);
};

const createTurno = async (req, res)=>{
    try{
        const nuevoTurno = await Turno.create(req.body);
        respuestaEstandar(res, 201, true, 'Turno creado exitosamente', nuevoTurno); 
    }catch(error){
        if(error.name === 'ValidationError'){
            const errores = Object.values(error.errors).map(err => err.message);
            respuestaEstandar(res, 400, false, 'Error de validación', errores);
        
        }
            respuestaEstandar(res, 500, false, 'Error al crear el turno', error.message);
        
    }
    
    
};

const deleteTurnos = (req, res)=>{
    const {id}= req.params;
    const turnoExiste = turnos.some(t=>t.id === parseInt(id));

    if(!turnoExiste){
        return respuestaEstandar(res, 404,false, 'Turno no encontrado');
    }

    turnos = turnos.filter(t=> t.id !== parseInt(id) );

   respuestaEstandar(res, 200, true, 'Se elimino correctamente', turnos);
    
};

const getPorEspecialidad = (req, res) => {
    const { especialidad } = req.params;

    const turnoFiltrado = turnos.filter(
        t => t.especialidad.toLowerCase() === especialidad.toLowerCase()
    );

    if (turnoFiltrado.length === 0) {
        return respuestaEstandar(res, 404, false,'No se encontró ningún turno para esa especialidad'
        );
    }

    return respuestaEstandar(res, 200, true, `Turnos de la especialidad ${especialidad}`, turnoFiltrado
    );
}; 

module.exports = {
    getTurnos,
    createTurno,
    deleteTurnos,
    getPorEspecialidad
};