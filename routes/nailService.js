const {Router} = require('express');
const { check,param } = require('express-validator');
const { getNailsServices, getNailService, addNailService, stateNailService, modNailService,deleteNailService } = require('../controllers/nailService');

const { verifyNailServiceId } = require('../helpers/verifyNails');


const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = new Router();

router.get('/',getNailsServices);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailServiceId),
    validarCampos
],getNailService)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],addNailService)

router.put('/state/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailServiceId),
    validarCampos
],stateNailService)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailServiceId),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],modNailService)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailServiceId),
    validarCampos
],deleteNailService)





module.exports = router