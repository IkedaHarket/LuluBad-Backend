/*
    Controlador de autenticación
*/
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const Usuario = require("../models/usuario");


const register = async(req,res) =>{
    try {
        const {...data} = req.body;
        data.admin = false;
        
        //* Encriptar password
        const salt = bcryptjs.genSaltSync(10);
        data.password = bcryptjs.hashSync(data.password, salt);

        //* Guardar usuario
        const usuario = new Usuario({...data});
        await usuario.save();

        //*Generar token
        const token = await generarJWT(usuario.uid)

        return res.status(201).json({
            ok:true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Error interno del servidor"});
    }
}
const login = async(req,res) =>{
    const {correo,password} = req.body;
    try {
        const usuario = await Usuario.findOne({correo})
        
        if(!usuario){
            return res.status(400).json({
                ok:false,
                errors:[{msg:"Usuario o contraseña incorrectos"}]
            })
        }
        const validPassword =  bcryptjs.compareSync(password,usuario.password)
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                errors:[{msg:"Usuario o contraseña incorrectos"}]
            })
        }
        if(!usuario.estado){
            return res.status(400).json({
                ok:false,
                errors:[{msg:"Este usuario se encuentra deshabilitado"}]
            })
        }
        // console.log(usuario.id)
        const token = await generarJWT(usuario.id);

        return res.status(200).json({
            ok:true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor"
        })
    }
}



module.exports = {
    register,
    login,
}