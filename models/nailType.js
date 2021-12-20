
/*
    Nail Type Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const NailTypeSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    estado:{
        type:Boolean,
        default:true
    },
},{
    timestamps:true
});


NailTypeSchema.plugin(mongoosePaginate);

module.exports = model('NailType',NailTypeSchema);