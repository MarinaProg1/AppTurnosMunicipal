const mongoose = require('mongoose');

const medicoSchema = new mongoose.Schema({  
    nombre: {
         type: String,
         required: true 
        },
    apellido: { 
        type: String, 
        required: true  
    },
    dni: { 
        type: String, 
        required: true,
        unique: [true, 'El DNI del paciente debe ser único'],
        match: [/^[0-9]{7,8}$/, 'El DNI debe tener 8 dígitos']
    },
    matricula: { 
        type: String, 
        required: true,
        unique: true
    },
    especialidad:[ { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Especialidad',    
        required: true 
    }],
    correo: { 
        type: String, 
        required: true, 
        unique: true },
    telefono: { 
        tipo: {
            type: String,
            enum: ['CELULAR', 'FIJO', 'TRABAJO']
        },
        codigoArea: {
            type: String,
            required: true,
            match: [/^[0-9]{2,5}$/, 'El código de área no es válido']
        },
        numero: {
            type: String,
            required: true,
            match: [/^[0-9]{7,10}$/, 'El número de teléfono no es válido']
        }
    },
    obrasSociales:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ObraSocial', 
        required: true 
    }],
    activo: {
        type: Boolean,
        default: true,
    }   
});
 medicoSchema.set('toJSON', {
    transform: (documento, medicoRetorno) => {
        medicoRetorno.id = medicoRetorno._id;
        delete medicoRetorno._id;
        delete medicoRetorno.__v;
        return medicoRetorno;
    }   
});
module.exports = mongoose.model('Medico', medicoSchema);