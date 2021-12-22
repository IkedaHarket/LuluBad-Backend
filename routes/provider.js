const {Router} = require('express');
const { check,param } = require('express-validator');
const { getProviders, getProvider, addProvider, stateProvider, modProvider,deleteProvider } = require('../controllers/provider');

const { verifyProviderId } = require('../helpers/verifyProvider');


const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = new Router();

router.get('/',[
    validarJWT,
    validarCampos
],getProviders);

router.get('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProviderId),
    validarCampos
],getProvider)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],addProvider)

router.put('/state/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProviderId),
    validarCampos
],stateProvider)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProviderId),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],modProvider)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProviderId),
    validarCampos
],deleteProvider)





module.exports = router