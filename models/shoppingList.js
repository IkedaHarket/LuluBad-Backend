
/*
    Shopping List Template
*/

const {Schema, model} = require('mongoose');

const ShoppingListSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
});


module.exports = model('ShoppingList',ShoppingListSchema);