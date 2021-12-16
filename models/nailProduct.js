/*
    Nail Product Template
*/


const {Schema, model} = require('mongoose');

const NailProductSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    provider:{
        type: Schema.Types.ObjectId,
        ref:'Provider'
    }
});


module.exports = model('NailProduct',NailProductSchema);