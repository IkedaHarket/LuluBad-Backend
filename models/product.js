/*
    Nail Product Template
*/


const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

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
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'ProductCategory'
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
ProductSchema.plugin(mongoosePaginate);

module.exports = model('Product',ProductSchema);