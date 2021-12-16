
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



module.exports = {
    verificarCorreoUsuario,
}