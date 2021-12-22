const Provider = require("../models/provider");

const { verifyUserAdmin } = require("../helpers/verifyUsers");

const getProviders = async(req,res) =>{
    try {

        if(verifyUserAdmin(req,res)) return false;

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
        }

        const provider = await Provider.paginate({},options);

        return res.status(200).json(provider)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/provider/getProviders"
        })
    }
}
const getProvider = async(req,res) =>{
    try {

        const {id} = req.params;
        const provider = await Provider.findById(id); 

        if(verifyUserAdmin(req,res)) return false;

        return res.status(200).json({
            provider
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/provider/getProvider"
        })
    }
}
const addProvider = async(req,res) =>{
    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const provider = new Provider({...data});

        await provider.save(); 

        return res.status(200).json({
            ok:true,
            provider
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/provider/addProvider"
        })
    }
}
const stateProvider = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {estado} = await Provider.findById(id)

        const provider = await Provider.findByIdAndUpdate(id,{estado:!estado},{new:true});

        return res.status(200).json({
            ok:true,
            provider
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/provider/stateProvider"
        })
    }
}
const modProvider = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;

        const provider = await Provider.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            provider
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/provider/modProvider"
        })
    }
}
const deleteProvider = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const provider = await Provider.findByIdAndDelete(id)

        return res.status(200).json({
            ok:true,
            provider
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/provider/deleteProvider"
        })
    }
}


module.exports= {
    getProviders,
    getProvider,
    addProvider,
    stateProvider,
    modProvider,
    deleteProvider,
}