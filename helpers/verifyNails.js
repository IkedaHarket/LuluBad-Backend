

const Nail = require("../models/nail");
const NailService = require("../models/nailService");
const NailShape = require("../models/nailShape");
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

module.exports = {
    verifyNailId,
    verifyNailTypeId,
    verifyNailShapeId,
    verifyNailServiceId
}