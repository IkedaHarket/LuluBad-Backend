
/*
    Nail Shape Template
*/

const {Schema, model} = require('mongoose');

const NailShapeSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
});


module.exports = model('NailShape',NailShapeSchema);