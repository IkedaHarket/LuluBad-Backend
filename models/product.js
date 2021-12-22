/*
    Nail Product Template
*/


const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    provider:{
        type: Schema.Types.ObjectId,
        ref:'Provider'
    },
    marca:{
        type: Schema.Types.ObjectId,
        ref:'ProductBrand'
    },
    precio:{
        type:String
    },
    estado:{
        type:Boolean,
        default:true
    },
},{
    timestamps:true
});


module.exports = model('Product',ProductSchema);