const Provider = require("../models/provider");


const verifyProviderId = async(id)=>{
    const providerId = await Provider.findById(id);
    if(!providerId){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
     verifyProviderId
}