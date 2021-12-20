/*
    Nail Controller
*/


const { verifyUserAdmin } = require('../helpers/verifyUsers');
const Nail = require('../models/nail');


const getNails = async(req,res) =>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
        }

        const nails = await Nail.paginate({},options);

        return res.status(200).json(nails)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nail/getNails"
        })
    }
}

const getNail = async(req,res) =>{
    try {
        const {id} = req.params;
        const nail = await Nail.findById(id); 
        
        return res.status(200).json({
            nail
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nail/getNail"
        })
    }
}

const addNail = async(req,res)=>{
    try {
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const nail = new Nail({...data});

        await nail.save(); 

        return res.status(200).json({
            ok:true,
            nail
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor",
            desc:"Error controllers/nail/addNail"
        })
    }
}

const modNail = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;
        const nail = await Nail.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            nail
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nail/modNail"
        })
    }
}

const stateNail = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {estado} = await Nail.findById(id)

        const nail = await Nail.findByIdAndUpdate(id,{estado:!estado},{new:true});

        return res.status(200).json({
            ok:true,
            nail
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nail/stateNail"
        })
    }
}

const deleteNail = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const nail = await Nail.findByIdAndDelete(id)

        return res.status(200).json({
            ok:true,
            nail
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nail/deleteNail"
        })
    }
}


module.exports = {
    getNails,
    getNail,
    addNail,
    modNail,
    stateNail,
    deleteNail,
}