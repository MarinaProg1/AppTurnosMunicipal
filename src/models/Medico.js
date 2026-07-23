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
        type: String, 
        required: true 
    },
    obrasSociales:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ObraSocial', 
        required: true 
    }]   
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