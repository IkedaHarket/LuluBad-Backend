
/*
    Provider Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const ProviderSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    direccion:{
        type:String
    },
    telefono:{
        type:String,
    },
    desc:{
        type:String,
    },
    ig:{
        type:String,
    },
    web:{
        type:String,
    },
    estado:{
        type:Boolean,
        default:true
    }    
},
{
    timestamps:true
});
ProviderSchema.plugin(mongoosePaginate);

module.exports = model('Provider',ProviderSchema);