/*
    Nail Polish Template
*/


const {Schema, model} = require('mongoose');

const NailPolishSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
});


module.exports = model('NailPolish',NailPolishSchema);