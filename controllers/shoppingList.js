const ShoppingList = require("../models/shoppingList");

const { verifyUserAdmin } = require("../helpers/verifyUsers");

const getShoppingListItems = async(req,res) =>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
        }

        const shoppingListItem = await ShoppingList.paginate({},options);

        return res.status(200).json(shoppingListItem)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/shoppingList/getShoppingListItems"
        })
    }
}
const getShoppingListItem = async(req,res) =>{
    try {
        const {id} = req.params;
        const shoppingListItem = await ShoppingList.findById(id); 
        
        return res.status(200).json({
            shoppingListItem
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/shoppingList/getShoppingListItem"
        })
    }
}
const addShoppingListItem = async(req,res) =>{
    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const shoppingListItem = new ShoppingList({...data});

        await shoppingListItem.save(); 

        return res.status(200).json({
            ok:true,
            shoppingListItem
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/shoppingList/addShoppingListItem"
        })
    }
}
const stateShoppingListItem = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {estado} = await ShoppingList.findById(id)

        const shoppingListItem = await ShoppingList.findByIdAndUpdate(id,{estado:!estado},{new:true});

        return res.status(200).json({
            ok:true,
            shoppingListItem
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/shoppingList/stateShoppingListItem"
        })
    }
}
const modShoppingListItem = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;

        const shoppingListItem = await ShoppingList.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            shoppingListItem
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/shoppingList/modShoppingListItem"
        })
    }
}
const deleteShoppingListItem = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const shoppingListItem = await ShoppingList.findByIdAndDelete(id)

        return res.status(200).json({
            ok:true,
            shoppingListItem
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/shoppingList/deleteShoppingListItem"
        })
    }
}


module.exports= {
    getShoppingListItems,
    getShoppingListItem,
    addShoppingListItem,
    stateShoppingListItem,
    modShoppingListItem,
    deleteShoppingListItem,
}