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

const createTurno = (req, res)=>{
    const { paciente, dni, especialidad} = req.body;

    if (!paciente || !dni || !especialidad){
        return respuestaEstandar(res, 400, false, 'Faltan datos requeridos')
    }

    const nuevoTurno = {
        id: turnos.length + 1,
        paciente,
        dni,
        especialidad
    };
    turnos.push(nuevoTurno);
    respuestaEstandar(res, 201, true,' Turno creado exitosamente',nuevoTurno)
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

const getPorEspecialidad = (req, res)=>{
    const {especialidad}= req.params;
    const turnoFiltrado = turnos.filter(t => t.especialidad.toLocaleLowerCase() === especialidad.toLocaleLowerCase());
   
    
    if (turnoFiltrado.length === 0) {
     respuestaEstandar(res, 404, false, 'No se encontro el turno', turnoFiltrado);
    }

    return respuestaEstandar(res, 200, true, `Datos de pasientes con especialidad ${turnoFiltrado}`, turnoFiltrado);
};
    

module.exports = {
    getTurnos,
    createTurno,
    deleteTurnos,
    getPorEspecialidad
};