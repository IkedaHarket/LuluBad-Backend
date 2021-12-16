
/*
    Provider Template
*/

const {Schema, model} = require('mongoose');

const ProviderSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    direccion:{
        type:String
    },
    telefono:{
        type:String,
    },
    desc:{
        type:String,
    },
    ig:{
        type:String,
    },
    web:{
        type:String,
    },

});


module.exports = model('Provider',ProviderSchema);