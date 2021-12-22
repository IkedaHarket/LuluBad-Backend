/*
    Nail Brand Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductBrandSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type:Boolean,
        default:true
    },
},{
    timestamps:true
});

ProductBrandSchema.plugin(mongoosePaginate);

module.exports = model('ProductBrand',ProductBrandSchema);