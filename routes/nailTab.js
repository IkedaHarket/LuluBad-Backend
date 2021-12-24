const {Router} = require('express');
const { check,param } = require('express-validator');
const { addNailTab, getNailsTabs,getNailTab, modNailTab, deleteNailTab } = require('../controllers/nailTab');

const { verifyNailTabId, verifyNailTypeId, verifyNailShapeId, verifyNailTabUser } = require('../helpers/verifyNails');
const { verifyUserId } = require('../helpers/verifyUsers');


const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = new Router();

router.get('/',[
    validarJWT,
    validarCampos
],getNailsTabs)

router.get('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailTabId),
    validarCampos
],getNailTab)

router.post('/',[
    validarJWT,
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('user').custom(verifyUserId),
    check('user').custom(verifyNailTabUser),
    validarCampos,
],addNailTab)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailTabId),
    check('user').custom(verifyNailTabUser),
    validarCampos
],modNailTab)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailTabId),
    validarCampos
],deleteNailTab)



module.exports = router