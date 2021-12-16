
/*
    Nail Template
*/

const {Schema, model} = require('mongoose');

const NailSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    desc:{
        type:String
    },
    precio:{
        type:String,
        required:[true, 'El precio es obligatorio'],
    }
});


module.exports = model('Nail',NailSchema);