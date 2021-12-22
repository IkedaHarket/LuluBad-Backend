const ProductBrand = require("../models/productBrand");

const { verifyUserAdmin } = require("../helpers/verifyUsers");

const getProductBrands = async(req,res) =>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
        }

        const productBrand = await ProductBrand.paginate({},options);

        return res.status(200).json(productBrand)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productBrand/getProductBrands"
        })
    }
}
const getProductBrand = async(req,res) =>{
    try {
        const {id} = req.params;
        const productBrand = await ProductBrand.findById(id); 
        
        return res.status(200).json({
            productBrand
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productBrand/getProductBrand"
        })
    }
}
const addProductBrand = async(req,res) =>{
    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const productBrand = new ProductBrand({...data});

        await productBrand.save(); 

        return res.status(200).json({
            ok:true,
            productBrand
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productBrand/addProductBrand"
        })
    }
}
const stateProductBrand = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {estado} = await ProductBrand.findById(id)

        const productBrand = await ProductBrand.findByIdAndUpdate(id,{estado:!estado},{new:true});

        return res.status(200).json({
            ok:true,
            productBrand
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productBrand/stateProductBrand"
        })
    }
}
const modProductBrand = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;

        const productBrand = await ProductBrand.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            productBrand
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productBrand/modProductBrand"
        })
    }
}
const deleteProductBrand = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const productBrand = await ProductBrand.findByIdAndDelete(id)

        return res.status(200).json({
            ok:true,
            productBrand
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/productBrand/deleteProductBrand"
        })
    }
}


module.exports= {
    getProductBrands,
    getProductBrand,
    addProductBrand,
    stateProductBrand,
    modProductBrand,
    deleteProductBrand,
}