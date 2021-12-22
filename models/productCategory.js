const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductCategorySchema = Schema({
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

ProductCategorySchema.plugin(mongoosePaginate);

module.exports = model('ProductCategory',ProductCategorySchema);