
/*
    Nail Type Template
*/

const {Schema, model} = require('mongoose');

const NailTypeSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
});


module.exports = model('NailType',NailTypeSchema);