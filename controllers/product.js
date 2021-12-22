const Product = require("../models/product");

const { verifyUserAdmin } = require("../helpers/verifyUsers");

const getProducts = async(req,res) =>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
            populate:[
                { path: 'marca', model: 'ProductBrand'},
                { path: 'provider', model: 'Provider' },
                { path: 'categoria', model: 'ProductCategory' },
            ]
        }

        const products = await Product.paginate({},options);
        // const products = await Product.find().populate({ path: 'marca', model: 'ProductBrand' })

        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/product/getProducts"
        })
    }
}

const getProduct = async(req,res) =>{
    try {
        const {id} = req.params;
        
        const product = await Product.findById(id).populate([
            { path: 'marca', model: 'ProductBrand' },
            { path: 'provider', model: 'Provider' },
            { path: 'categoria', model: 'ProductCategory' }
        ])

        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/product/getProduct"
        })
    }
}

const addProduct = async(req,res) =>{
    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const product = new Product({...data});

        await product.save(); 

        return res.status(200).json({
            ok:true,
            product
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/product/addProduct"
        })
    }
}

const stateProduct = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {estado} = await Product.findById(id)

        const product = await Product.findByIdAndUpdate(id,{estado:!estado},{new:true}).populate([
            { path: 'marca', model: 'ProductBrand' },
            { path: 'provider', model: 'Provider' },
            { path: 'categoria', model: 'ProductCategory' }
        ])

        return res.status(200).json({
            ok:true,
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/product/stateProduct"
        })
    }
}

const modProduct = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;

        const product = await Product.findByIdAndUpdate(id,{...data},{new:true}).populate([
            { path: 'marca', model: 'ProductBrand' },
            { path: 'provider', model: 'Provider' },
            { path: 'categoria', model: 'ProductCategory' }
        ])

        return res.status(200).json({
            ok:true,
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/product/modProduct"
        })
    }
}
const deleteProduct = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const product = await Product.findByIdAndDelete(id).populate([
            { path: 'marca', model: 'ProductBrand' },
            { path: 'provider', model: 'Provider' },
            { path: 'categoria', model: 'ProductCategory' }
        ])

        return res.status(200).json({
            ok:true,
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/product/deleteProduct"
        })
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProduct,
    stateProduct,
    modProduct,
    deleteProduct
}