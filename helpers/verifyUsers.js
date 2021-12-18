
/*
    Helpers para verificar en la bd de usuarios
*/


const Usuario = require("../models/usuario");


const verifyEmailReg = async(correo)=>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`Este correo ya se encuentra registrado`);
    }
}

const verifyEmailNoReg = async(correo)=>{
    const existeCorreo = await Usuario.findOne({correo});
    if(!existeCorreo){
        throw new Error(`Este correo no se encuentra registrado`);
    }
}

const verifyUserId = async(id) =>{
    const userId = await Usuario.findById(id);
    if(!userId){
        throw new Error(`El id ${id} no existe`);
    }
}


module.exports = {
    verifyEmailReg,
    verifyEmailNoReg,
    verifyUserId,
}