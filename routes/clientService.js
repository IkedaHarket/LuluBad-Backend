const {Router} = require('express');
const { check, param } = require('express-validator');
const { addClientService, getClientsServices, getClientService, modClientService, deleteClientService } = require('../controllers/clientService');

const { verifyClientServiceId } = require('../helpers/verifyClientService');
const {  verifyNailId } = require('../helpers/verifyNails');

const { verifyUserId } = require('../helpers/verifyUsers');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = new Router();

router.get('/',getClientsServices)

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyClientServiceId),
    validarCampos
],getClientService)

router.post('/',[
    validarJWT,
    check('nail','La uña es obligatoria').not().isEmpty(),
    check('nail').custom(verifyNailId),
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('user').custom(verifyUserId),
    check('total','El total es obligatorio').not().isEmpty(),
    validarCampos,
],addClientService)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyClientServiceId),
    check('nail','La uña es obligatoria').not().isEmpty(),
    check('nail').custom(verifyNailId),
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('user').custom(verifyUserId),
    validarCampos
],modClientService)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyClientServiceId),
    validarCampos
],deleteClientService)




module.exports = router