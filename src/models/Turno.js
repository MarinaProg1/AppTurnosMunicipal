const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
    paciente: {
        type: String,
        required: [true, 'El nombre del paciente es obligatorio'],
        uppercase: true,
    },
    dni: {
        type: String,
        required: [true, 'El DNI es obligatorio'],  
        match: [/^[0-9]{7,8}$/, 'El DNI debe tener 8 dígitos'],
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
        required: [true, 'La fecha es obligatoria']
    },
    hora: {
        type: String,
        required: [true, 'La hora es obligatoria'],
        validate: {
            validator: function(value) {
                return value >= new Date().toISOString();
            },
            message: 'La hora debe ser una fecha futura'
        },
    },
    estado: {
        type: String,
        enum: ['pendiente', 'atendido', 'cancelado'],
        default: 'pendiente'
    }
}, { timestamps: true });

module.exports = mongoose.model('Turno', turnoSchema);
