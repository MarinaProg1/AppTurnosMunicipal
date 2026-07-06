let turnos= [
    {id:1, paciente: "Juan Perez", dni:"43567890", especialidad:"cardiología"},
    {id:2, paciente: "Ramon Looss", dni:"40367890", especialidad:"pediatría"},
    {id:3, paciente: "Lucia Rodriguez", dni:"33507890", especialidad:"oncología"},
    {id:4, paciente: "Marcela Crass", dni:"23227890", especialidad:"dentista"},
]

const getTurnos = (req, res)=>{
    res.status(200).json({
        total: turnos.length, 
        data: turnos
    });
};

const createTurno = (req, res)=>{
    const { paciente, dni, especialidad} = req.body;

    if (!paciente || !dni || !especialidad){
        return res.status(400).json({error: "Faltan datos requeridos"});
    }

    const nuevoTurno = {
        id: turnos.length + 1,
        paciente,
        dni,
        especialidad
    };
    turnos.push(nuevoTurno);
    res.status(201).json({message:"ok", data: nuevoTurno})
};

const deleteTurnos = (req, res)=>{
    const {id}= req.params;
    const turnoExiste = turnos.some(t=>t.id === parseInt(id));

    if(!turnoExiste){
        return res.status(404).json({error: "Turno no encontrado"});
    }

    turnos = turnos.filter(t=> t.id !== parseInt(id) );
    res.status(200).json({message: 'ok', data: turnos})
};

const getPorEspecialidad = (req, res)=>{
    const {especialidad}= req.params;
    const turnoFiltrado = turnos.filter(t => t.especialidad.toLocaleLowerCase()=== especialidad);
   
    
    if (turnoFiltrado.length === 0) {

    const sugerencia = turnos.find(t =>
        t.especialidad.toLowerCase().includes(especialidad.toLowerCase()) ||
        especialidad.toLowerCase().includes(t.especialidad.toLowerCase())
    );

    if (sugerencia) {
        return res.status(404).json({
            error: `No existe la especialidad "${especialidad}". ¿Quiso decir "${sugerencia.especialidad}"?`
        });
    }

    return res.status(404).json({
        error: `No existe la especialidad "${especialidad}".`
    });
}
    
    res.status(200).json({ total: turnoFiltrado.length, data: turnoFiltrado});

}

module.exports = {
    getTurnos,
    createTurno,
    deleteTurnos,
    getPorEspecialidad
};