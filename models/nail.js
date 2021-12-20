
/*
    Nail Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const NailSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    desc:{
        type:String
    },
    estado:{
        type:Boolean,
        default:true
    },
    precio:{
        type:String,
        required:[true, 'El precio es obligatorio'],
    }
    
},
{
    timestamps:true
}
);

NailSchema.plugin(mongoosePaginate);

module.exports = model('Nail',NailSchema);