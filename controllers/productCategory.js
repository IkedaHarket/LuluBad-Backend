const ProductCategory = require("../models/productCategory");

const { verifyUserAdmin } = require("../helpers/verifyUsers");

const getProductsCategorys = async(req,res) =>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
        }

        const productCategory = await ProductCategory.paginate({},options);

        return res.status(200).json(productCategory)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productCategory/getProductsCategorys"
        })
    }
}
const getProductCategory = async(req,res) =>{
    try {
        const {id} = req.params;
        const productCategory = await ProductCategory.findById(id); 
        
        return res.status(200).json({
            productCategory
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productCategory/getProductCategory"
        })
    }
}
const addProductCategory = async(req,res) =>{
    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const productCategory = new ProductCategory({...data});

        await productCategory.save(); 

        return res.status(200).json({
            ok:true,
            productCategory
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productCategory/addProductCategory"
        })
    }
}
const stateProductCategory = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {estado} = await ProductCategory.findById(id)

        const productCategory = await ProductCategory.findByIdAndUpdate(id,{estado:!estado},{new:true});

        return res.status(200).json({
            ok:true,
            productCategory
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productCategory/stateProductCategory"
        })
    }
}
const modProductCategory = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;

        const productCategory = await ProductCategory.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            productCategory
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productCategory/modProductCategory"
        })
    }
}
const deleteProductCategory = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const productCategory = await ProductCategory.findByIdAndDelete(id)

        return res.status(200).json({
            ok:true,
            productCategory
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productCategory/deleteProductCategory"
        })
    }
}


module.exports= {
    getProductsCategorys,
    getProductCategory,
    addProductCategory,
    stateProductCategory,
    modProductCategory,
    deleteProductCategory,
}