const mongoose = require('mongoose');

const especialidadSchema = new mongoose.Schema({  
    nombre: {
         type: String,
         required: true 
        },
    descripcion: {
        type: String, 
        required: true  
    }   
    
});
especialidadSchema.set('toJSON', {
    transform: (documento, especialidadRetorno) => {
        especialidadRetorno.id = especialidadRetorno._id;
        delete especialidadRetorno._id;
        delete especialidadRetorno.__v;
        return especialidadRetorno;
    }
});
module.exports = mongoose.model('Especialidad', especialidadSchema);    