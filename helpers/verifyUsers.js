
/*
    Helpers para verificar en la bd de usuarios
*/


const Usuario = require("../models/usuario");


const verificarCorreoUsuario = async(correo)=>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`Este correo ya se encuentra registrado`);
    }
}
const verifyUserId = async(id) =>{
    const userId = await Usuario.findById(id);
    if(!userId){
        throw new Error(`El id ${id} no existe`);
    }
}


module.exports = {
    verificarCorreoUsuario,
    verifyUserId,
}