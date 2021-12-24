

const Nail = require("../models/nail");
const NailService = require("../models/nailService");
const NailShape = require("../models/nailShape");
const NailTab = require("../models/nailTab");
const NailType = require("../models/nailType");

const verifyNailId = async(id) =>{
    const nailId = await Nail.findById(id);
    if(!nailId){
        throw new Error(`El id ${id} no existe`);
    }
}

const verifyNailTypeId = async(id)=>{
    const nailId = await NailType.findById(id);
    if(!nailId){
        throw new Error(`El id ${id} no existe`);
    }
}

const verifyNailShapeId = async(id)=>{
    const nailId = await NailShape.findById(id);
    if(!nailId){
        throw new Error(`El id ${id} no existe`);
    }
}

const verifyNailServiceId = async(id)=>{
    const nailId = await NailService.findById(id);
    if(!nailId){
        throw new Error(`El id ${id} no existe`);
    }
}

const verifyNailTabId = async(id)=>{
    const nailId = await NailTab.findById(id);
    if(!nailId){
        throw new Error(`El id ${id} no existe`);
    }
}
const verifyNailTabUser = async(user)=>{
    const existeUser = await NailTab.findOne({user});
    if(existeUser){
        throw new Error(`Este usuario ya se encuentra registrado`);
    }
}


module.exports = {
    verifyNailId,
    verifyNailTypeId,
    verifyNailShapeId,
    verifyNailServiceId,
    verifyNailTabId,
    verifyNailTabUser
}