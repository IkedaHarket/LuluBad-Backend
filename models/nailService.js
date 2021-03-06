/*
    Nail Service Template
*/


const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const NailServiceSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    estado:{
        type:Boolean,
        default:true
    },
    desc:{
        type:String
    },
    precio:{
        type:String,
        required:[true, 'El precio es obligatorio'],
    }
},{
    timestamps:true
});

NailServiceSchema.plugin(mongoosePaginate);


module.exports = model('NailService',NailServiceSchema);