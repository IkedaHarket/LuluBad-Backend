const {Router} = require('express');
const { check, param } = require('express-validator');

const { addAppoiment, getAppointments, getAppointment, modAppoiment, deleteAppoiment } = require('../controllers/appoiment');
const { verifyAppoimentId } = require('../helpers/verifyAppoiment');

const {  verifyNailId } = require('../helpers/verifyNails');

const { verifyUserId } = require('../helpers/verifyUsers');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = new Router();

router.get('/',[
    validarJWT,
    validarCampos,
],getAppointments)

router.get('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyAppoimentId),
    validarCampos
],getAppointment)

router.post('/',[
    validarJWT,
    check('fecha','La fecha no es valida').not().isEmpty(),
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('user').custom(verifyUserId),
    check('nail','La uña es obligatoria').not().isEmpty(),
    check('nail').custom(verifyNailId),
    validarCampos,
],addAppoiment)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyAppoimentId),
    check('user','El usuario es obligatoria').not().isEmpty(),
    check('user').custom(verifyUserId),
    validarCampos
],modAppoiment)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyAppoimentId),
    validarCampos
],deleteAppoiment)

module.exports = router