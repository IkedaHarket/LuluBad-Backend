const { verifyUserAdmin } = require("../helpers/verifyUsers");
const Appointment = require("../models/appointment");

const getAppointments = async(req,res) =>{
    try {

        if(verifyUserAdmin(req,res)) return false;

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
            populate:[
                { path: 'user', model: 'Usuario' },
                { path: 'nail', model: 'Nail'},
                { path: 'polishPrev', model: 'Product' },
                { path: 'servicePrev', model: 'NailService' },
            ]
        }

        const appointments = await Appointment.paginate({},options);

        return res.status(200).json(appointments)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/appointment/getAppointments"
        })
    }
}

const getAppointment = async(req,res) =>{
    try {

        if(verifyUserAdmin(req,res)) return false;

        const {id} = req.params;
        
        const appointments = await Appointment.findById(id).populate([
                { path: 'user', model: 'Usuario' },
                { path: 'nail', model: 'Nail'},
                { path: 'polishPrev', model: 'Product' },
                { path: 'servicePrev', model: 'NailService' },
        ])

        return res.status(200).json(appointments)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/appointment/getAppointment"
        })
    }
}

const addAppoiment = async(req,res) =>{

    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const appointment = new Appointment({...data});

        await appointment.save(); 

        return res.status(200).json({
            ok:true,
            appointment
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/appointment/addAppoiment"
        })
    }
}
const modAppoiment = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;

        const appoiment = await Appointment.findByIdAndUpdate(id,{...data},{new:true}).populate([
                { path: 'user', model: 'Usuario' },
                { path: 'nail', model: 'Nail'},
                { path: 'polishPrev', model: 'Product' },
                { path: 'servicePrev', model: 'NailService' },
        ])

        return res.status(200).json({
            ok:true,
            appoiment
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/appoiment/modAppoiment"
        })
    }
}

const deleteAppoiment = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const appoiment = await Appointment.findByIdAndDelete(id).populate([
                { path: 'user', model: 'Usuario' },
                { path: 'nail', model: 'Nail'},
                { path: 'polishPrev', model: 'Product' },
                { path: 'servicePrev', model: 'NailService' },
        ])

        return res.status(200).json({
            ok:true,
            appoiment
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/appoiment/deleteAppoiment"
        })
    }
}

module.exports = {
    addAppoiment,
    getAppointments,
    getAppointment,
    modAppoiment,
    deleteAppoiment,
}