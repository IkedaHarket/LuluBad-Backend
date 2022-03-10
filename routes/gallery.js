/*
    Ruta nails 
*/

const {Router} = require('express');
const { check,param } = require('express-validator');
const { getGallery, getGalleryImg, addImgGallery,modImgGallery, deleteImgGallery } = require('../controllers/gallery');
const { verifyImgGalleryId } = require('../helpers/verifyGallery');
const { fileUpload } = require('../middlewares/fileUpload');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = new Router();

router.get('/',getGallery);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyImgGalleryId),
    validarCampos
],getGalleryImg)

router.post('/',[
    validarJWT,
    // check('nombre','El nombre es obligatorio').not().isEmpty(),
    // check('imagen','La imagen es obligatoria').not().isEmpty(),
    fileUpload,
    validarCampos
],addImgGallery);

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyImgGalleryId),
    // check('nombre','El nombre es obligatorio').not().isEmpty(),
    // check('imagen','La imagen es obligatoria').not().isEmpty(),
    fileUpload,
    validarCampos
],modImgGallery)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyImgGalleryId),
    validarCampos
],deleteImgGallery)


module.exports = router;