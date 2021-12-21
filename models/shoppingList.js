
/*
    Shopping List Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const ShoppingListSchema = Schema({
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
    imagen:{
        type:String
    },
    precio:{
        type:String
    },

},{
    timestamps:true
});


ShoppingListSchema.plugin(mongoosePaginate);

module.exports = model('ShoppingList',ShoppingListSchema);