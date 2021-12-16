/*
    Nail Service Template
*/


const {Schema, model} = require('mongoose');

const NailServiceSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
});


module.exports = model('NailService',NailServiceSchema);