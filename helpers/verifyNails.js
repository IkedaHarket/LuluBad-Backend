

const Nail = require("../models/nail");


const verifyNailId = async(id) =>{
    const nailId = await Nail.findById(id);
    if(!nailId){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    verifyNailId
}