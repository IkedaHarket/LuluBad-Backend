const {Router} = require('express');
const { check,param } = require('express-validator');
const { addNailType, getNailsTypes, getNailType, stateNailType, modNailType,deleteNailType } = require('../controllers/nailType');
const { verifyNailTypeId } = require('../helpers/verifyNails');


const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = new Router();

router.get('/',getNailsTypes);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailTypeId),
    validarCampos
],getNailType)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],addNailType)

router.put('/state/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailTypeId),
    validarCampos
],stateNailType)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailTypeId),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],modNailType)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailTypeId),
    validarCampos
],deleteNailType)





module.exports = router