const ClientService = require("../models/clientService");

const verifyClientServiceId = async(id)=>{
    const nailId = await ClientService.findById(id);
    if(!nailId){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    verifyClientServiceId
}