const mongoose = require('mongoose');

const obraSocialSchema = new mongoose.Schema({ 
    razonSocial: {  
        type: String,
        required: true  
    },
    cuit: { 
        type: String,
        required: true,
        unique: true
    },
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
    planes: [{
        type: String,
        required: true,
        enum: {
            values: ['Básico', 'Intermedio', 'Premium'],
            message: '{VALUE} no es un plan válido. Debe ser uno de los siguientes: Básico, Intermedio, Premium'
        }
    }] ,
    activo: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true    
});

obraSocialSchema.set('toJSON', {
    transform: (documento, obraSocialRetorno) => {
        obraSocialRetorno.id = obraSocialRetorno._id;
        delete obraSocialRetorno._id;
        delete obraSocialRetorno.__v;
        return obraSocialRetorno;
    }
});
module.exports = mongoose.model('ObraSocial', obraSocialSchema); 
