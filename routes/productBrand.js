const {Router} = require('express');
const { check,param } = require('express-validator');
const { getProductBrands, getProductBrand, addProductBrand, stateProductBrand, modProductBrand,deleteProductBrand } = require('../controllers/productBrand');

const { verifyProductBrandId } = require('../helpers/verifyProduct');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = new Router();

router.get('/',getProductBrands);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductBrandId),
    validarCampos
],getProductBrand)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],addProductBrand)

router.put('/state/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductBrandId),
    validarCampos
],stateProductBrand)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductBrandId),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],modProductBrand)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductBrandId),
    validarCampos
],deleteProductBrand)





module.exports = router