const {Router} = require('express');
const { check, param } = require('express-validator');
const { addProduct, getProducts, getProduct, stateProduct, modProduct, deleteProduct } = require('../controllers/product');

const { verifyProduct, verifyProductBrandId, verifyProductCategoryId } = require('../helpers/verifyProduct');
const { verifyProviderId } = require('../helpers/verifyProvider');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = new Router();

router.get('/',getProducts)

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProduct),
    validarCampos
],getProduct)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('marca','La marca es obligatoria').not().isEmpty(),
    check('marca').custom(verifyProductBrandId),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(verifyProductCategoryId),
    check('provider','El proveedor es obligatorio').not().isEmpty(),
    check('provider').custom(verifyProviderId),
    validarCampos,
],addProduct)

router.put('/state/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProduct),
    validarCampos
],stateProduct)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProduct),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('marca').custom(verifyProductBrandId),
    check('categoria').custom(verifyProductCategoryId),
    check('provider').custom(verifyProviderId),
    validarCampos
],modProduct)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProduct),
    validarCampos
],deleteProduct)


module.exports = router