const ShoppingList = require("../models/shoppingList");

const verifyShoppingListItemId = async(id)=>{
    const shoppingListItemId = await ShoppingList.findById(id);
    if(!shoppingListItemId){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    verifyShoppingListItemId,
}

