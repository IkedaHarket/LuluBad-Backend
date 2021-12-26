const {Router} = require('express');
const { check, param } = require('express-validator');
const { addClientService, getClientsServices, getClientService } = require('../controllers/clientService');

const { verifyClientServiceId } = require('../helpers/verifyClientService');
const { verifyNailServiceId, verifyNailId, verifyNailShapeId } = require('../helpers/verifyNails');

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
    // check('nailService').custom(verifyNailServiceId),
    check('nail','La uña es obligatoria').not().isEmpty(),
    check('nail').custom(verifyNailId),
    // check('nailService').custom(verifyNailShapeId),
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('user').custom(verifyUserId),
    check('total','El total es obligatorio').not().isEmpty(),
    validarCampos,
],addClientService)




module.exports = router