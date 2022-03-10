/*
    Gallery Controller
*/


const { deleteImg } = require('../helpers/deleteImg');
const { verifyUserAdmin } = require('../helpers/verifyUsers');
const Gallery = require('../models/gallery');



const getGallery = async(req,res) =>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
        }

        const gallery = await Gallery.paginate({},options);

        return res.status(200).json(gallery)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}

const getGalleryImg = async(req,res) =>{
    try {
        const {id} = req.params;
        const nail = await Gallery.findById(id); 
        
        return res.status(200).json({
            nail
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}

const addImgGallery = async(req,res)=>{
    try {
        const {...data} = req.body;
        if(verifyUserAdmin(req,res)) return false;

        data.imagen = req.file.filename;
        const nail = new Gallery({...data});

        await nail.save(); 

        return res.status(200).json({
            ok:true,
            nail
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor"
        })
    }
}

const modImgGallery = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const nailOld = await Gallery.findById(id);
        deleteImg(nailOld.imagen)

        const {...data} = req.body;
        data.imagen = req.file.filename;
        const nail = await Gallery.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            nail
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}


const deleteImgGallery = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const nail = await Gallery.findByIdAndDelete(id)
        deleteImg(nail.imagen)
        return res.status(200).json({
            ok:true,
            nail
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}


module.exports = {
    getGallery,
    getGalleryImg,
    addImgGallery,
    modImgGallery,
    deleteImgGallery,
}