const bcryptjs = require('bcryptjs');
// const { generarJWT } = require('../helpers/generarJWT');
const Usuario = require("../models/usuario");



const register = async(req,res) =>{
    try {
        const {...data} = req.body;
        data.admin = false;
        const usuario = new Usuario({...data});
        await usuario.save();

        return res.status(201).json(usuario);

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Error interno del servidor"});
    }
}

module.exports = {
    register
}