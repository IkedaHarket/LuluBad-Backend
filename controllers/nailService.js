const NailService = require("../models/nailService");

const { verifyUserAdmin } = require("../helpers/verifyUsers");

const getNailsServices = async(req,res) =>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
        }

        const nailsService = await NailService.paginate({},options);

        return res.status(200).json(nailsService)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailService/getNailsServices"
        })
    }
}
const getNailService = async(req,res) =>{
    try {
        const {id} = req.params;
        const nailsService = await NailService.findById(id); 
        
        return res.status(200).json({
            nailsService
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailService/getNailService"
        })
    }
}
const addNailService = async(req,res) =>{
    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const nailService = new NailService({...data});

        await nailService.save(); 

        return res.status(200).json({
            ok:true,
            nailService
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailService/addNailService"
        })
    }
}
const stateNailService = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {estado} = await NailService.findById(id)

        const nailService = await NailService.findByIdAndUpdate(id,{estado:!estado},{new:true});

        return res.status(200).json({
            ok:true,
            nailService
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailService/stateNailService"
        })
    }
}
const modNailService = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;

        const nailService = await NailService.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            nailService
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailService/modNailService"
        })
    }
}
const deleteNailService = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const nailService = await NailService.findByIdAndDelete(id)

        return res.status(200).json({
            ok:true,
            nailService
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailService/deleteNailService"
        })
    }
}


module.exports= {
    getNailsServices,
    getNailService,
    addNailService,
    stateNailService,
    modNailService,
    deleteNailService,
}