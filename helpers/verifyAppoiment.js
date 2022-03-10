const Appointment = require("../models/appointment");

const verifyAppoimentId = async(id)=>{
    const nailId = await Appointment.findById(id);
    if(!nailId){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    verifyAppoimentId
}