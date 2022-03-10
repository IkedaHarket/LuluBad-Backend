const Gallery = require("../models/gallery");

const verifyImgGalleryId = async(id) =>{
    const nailId = await Gallery.findById(id);
    if(!nailId){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    verifyImgGalleryId
}