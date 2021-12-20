/*
    Controlador de usuario 
*/

const { generarJWT } = require('../helpers/generarJWT');
const Usuario = require("../models/usuario");
const { transporter } = require("../helpers/sendCorreo");
const bcryptjs = require('bcryptjs');
const { verifyUserAdmin } = require('../helpers/verifyUsers');


const getUsers = async(req,res)=>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
        }

        const users = await Usuario.paginate({},options);

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/user/getUsers"
        })
    }
}
const getUser = async(req,res) =>{
    try {
        const {id} = req.params;
        const user = await Usuario.findById(id); 
        
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/user/getUser"
        })
    }
}
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
            msg:"Error Interno del servidor",
            desc:"Error controllers/user/forgotPass"
        })
    }
}
const banearUsuario = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {estado} = await Usuario.findById(id);
        const usuario = await Usuario.findByIdAndUpdate(id,{estado:!estado},{new:true});

        return res.status(200).json({
            ok:true,
            usuario
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor",
            desc:"Error controllers/user/banearUsuario"
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
            msg:"Error Interno del servidor",
            desc:"Error controllers/user/modifyUsers"
        })
    }
}

const deleteUser = async(req,res) =>{

    try {
        const {id} = req.params

        if(verifyUserAdmin(req,res)) return false;

        if(req.usuario.id === id || req.usuario.admin === true) {

            const usuario = await Usuario.findByIdAndDelete(id)

            return res.status(200).json({
                ok:true,
                msg:"Usuario borrado exitosamente",
                usuario
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor",
            desc:"Error controllers/user/deleteUser"
        })
    }
}

module.exports = {
    getUser,
    getUsers,
    forgotPass,
    banearUsuario,
    modifyUsers,
    deleteUser,
}