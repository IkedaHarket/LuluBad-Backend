const NailType = require("../models/nailType");

const { verifyUserAdmin } = require("../helpers/verifyUsers");

const getNailsTypes = async(req,res) =>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
        }

        const nailsTypes = await NailType.paginate({},options);

        return res.status(200).json(nailsTypes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailType/getNailsTypes"
        })
    }
}
const getNailType = async(req,res) =>{
    try {
        const {id} = req.params;
        const nailType = await NailType.findById(id); 
        
        return res.status(200).json({
            nailType
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailType/getNailType"
        })
    }
}
const addNailType = async(req,res) =>{
    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const nailType = new NailType({...data});

        await nailType.save(); 

        return res.status(200).json({
            ok:true,
            nailType
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailType/addNailType"
        })
    }
}
const stateNailType = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {estado} = await NailType.findById(id)

        const nailType = await NailType.findByIdAndUpdate(id,{estado:!estado},{new:true});

        return res.status(200).json({
            ok:true,
            nailType
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailType/stateNailType"
        })
    }
}
const modNailType = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;

        const nailType = await NailType.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            nailType
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailType/modNailType"
        })
    }
}
const deleteNailType = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const nailType = await NailType.findByIdAndDelete(id)

        return res.status(200).json({
            ok:true,
            nailType
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailType/deleteNailType"
        })
    }
}


module.exports= {
    getNailsTypes,
    getNailType,
    addNailType,
    stateNailType,
    modNailType,
    deleteNailType,
}