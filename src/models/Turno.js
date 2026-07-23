const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: [true, 'El nombre del paciente es obligatorio'],  
    },
    especialidad: {
        type: String,
        required: true,
        enum: {
            values: ['cardiología', 'dermatología', 'ginecología', 'neurología', 'pediatría'],
            message: '{VALUE} no es una especialidad válida. Debe ser una de las siguientes: cardiología, dermatología, ginecología, neurología, pediatría'
        }
    },
   fechaTurno: {
        type: Date,
        required: [true, 'La fecha del turno es obligatoria'],
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: 'La fecha del turno debe ser una fecha futura',
        },
    },
    estado: {
        type: String,
        enum: {
            values: ['pendiente', 'atendido', 'cancelado'],
            message: '{VALUE} no es un estado válido',
        },
    }, 
}, {
        timestamps: true,
});

turnoSchema.set('toJSON', {
    transform: (documento, turnoRetorno) => {
        turnoRetorno.id = turnoRetorno._id;
        delete turnoRetorno._id;
        delete turnoRetorno.__v;
        return turnoRetorno ;
    }
});

module.exports = mongoose.model('Turno', turnoSchema);
