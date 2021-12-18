/*
    Controlador de usuario 
*/

const { generarJWT } = require('../helpers/generarJWT');
const Usuario = require("../models/usuario");
const { transporter } = require("../helpers/sendCorreo");
const bcryptjs = require('bcryptjs');


const forgotPass = async(req,res) =>{
    try {
        const {correo} = req.body
        const token = await generarJWT(correo);

        await transporter.sendMail({
            from: 'Bad Lulu - Ikeda Bot', // sender address
            to: correo, // list of receivers
            subject: "Restablecer Contraseña", // Subject line
            html: `<h1>Restablecer </h1>
                    <h3>Haga click en el siguiente enlace para restablecer su contraseña</h3>
                    <a href="http://www.localhost:3000/auth/reset-password/${token}" >http://www.localhost:3000/auth/reset-password/${token}</a>
                    <br /><br />
                    <hr /> <i>Este correo a sido enviado desde la API de BadLulu </i>`, 
        });


        return res.status(200).json({
            ok:true,
            msg:"Mensaje Enviado correctamente"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor"
        })
    }
}
const banearUsuario = async(req,res) =>{
    try {
        const {id} = req.params;

        //* Comprobar si usuario es administrador
        if(!req.usuario.admin){
            return res.status(401).json({
                ok:false,
                msg:"Usted no tiene permitido hacer esto"
            })
        }

        const {estado} = await Usuario.findById(id);
        const usuario = await Usuario.findByIdAndUpdate(id,{estado:!estado},{new:true});

        return res.status(200).json({
            ok:true,
            usuario
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor"
        })
    }
}
const modifyUsers = async(req,res) =>{
    try {
        const {id} = req.usuario
        let {nombre,correo,newPassword,password,telefono,edad,instagram,imagen} = req.body;
        
        const user = await Usuario.findById(id)

        const validPassword =  bcryptjs.compareSync(password,user.password)

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                errors:[{msg:"Usuario o contraseña incorrectos"}]
            })
        }


        //* Encriptar password
        const salt = bcryptjs.genSaltSync(10);
        newPassword = bcryptjs.hashSync(newPassword, salt);

        const usuario = await Usuario.findByIdAndUpdate(id,{nombre,correo,password:newPassword,telefono,edad,instagram,imagen},{new: true});
    

        return res.status(200).json({
            ok:true,
            usuario
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor"
        })
    }
}


module.exports = {
    forgotPass,
    banearUsuario,
    modifyUsers,
}