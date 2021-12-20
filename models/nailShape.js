
/*
    Nail Shape Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const NailShapeSchema = Schema({
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

NailShapeSchema.plugin(mongoosePaginate);

module.exports = model('NailShape',NailShapeSchema);