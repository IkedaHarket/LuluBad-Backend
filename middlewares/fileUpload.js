const multer = require('multer')
const multerConfig = require('../helpers/multerConfig')

const upload = multer(multerConfig).single('imagen')

const fileUpload = (req,res,next) =>{
    upload(req,res,function(error){
        if(error) res.status(400).json({message:error})
        next();
    })
}

module.exports = {
    fileUpload
}