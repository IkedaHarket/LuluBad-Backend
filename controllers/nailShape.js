const NailShape = require("../models/nailShape");

const { verifyUserAdmin } = require("../helpers/verifyUsers");

const getNailsShape = async(req,res) =>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
        }

        const nailsShape = await NailShape.paginate({},options);

        return res.status(200).json(nailsShape)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailShape/getNailsShape"
        })
    }
}
const getNailShape = async(req,res) =>{
    try {
        const {id} = req.params;
        const nailsShape = await NailShape.findById(id); 
        
        return res.status(200).json({
            nailsShape
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailShape/getNailShape"
        })
    }
}
const addNailShape = async(req,res) =>{
    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const nailShape = new NailShape({...data});

        await nailShape.save(); 

        return res.status(200).json({
            ok:true,
            nailShape
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailShape/addNailShape"
        })
    }
}
const stateNailShape = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {estado} = await NailShape.findById(id)

        const nailShape = await NailShape.findByIdAndUpdate(id,{estado:!estado},{new:true});

        return res.status(200).json({
            ok:true,
            nailShape
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailShape/stateNailShape"
        })
    }
}
const modNailShape = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;

        const nailShape = await NailShape.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            nailShape
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailShape/modNailShape"
        })
    }
}
const deleteNailShape = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const nailShape = await NailShape.findByIdAndDelete(id)

        return res.status(200).json({
            ok:true,
            nailShape
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailShape/deleteNailShape"
        })
    }
}


module.exports= {
    getNailsShape,
    getNailShape,
    addNailShape,
    stateNailShape,
    modNailShape,
    deleteNailShape,
}