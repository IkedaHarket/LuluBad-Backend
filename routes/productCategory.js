const {Router} = require('express');
const { check,param } = require('express-validator');
const { getProductsCategorys, getProductCategory, addProductCategory, stateProductCategory, modProductCategory,deleteProductCategory } = require('../controllers/productCategory');

const { verifyProductCategoryId } = require('../helpers/verifyProduct');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = new Router();

router.get('/',getProductsCategorys);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductCategoryId),
    validarCampos
],getProductCategory)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],addProductCategory)

router.put('/state/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductCategoryId),
    validarCampos
],stateProductCategory)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductCategoryId),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],modProductCategory)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductCategoryId),
    validarCampos
],deleteProductCategory)





module.exports = router