/*
    Ruta nails 
*/

const {Router} = require('express');
const { check,param } = require('express-validator');
const { addNail, getNails, getNail,modNail, stateNail, deleteNail } = require('../controllers/nail');
const { verifyNailId } = require('../helpers/verifyNails');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = new Router();

router.get('/',getNails);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailId),
    validarCampos
],getNail)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    validarCampos
],addNail);

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    validarCampos
],modNail)

router.put('/state/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailId),
    validarCampos
],stateNail)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailId),
    validarCampos
],deleteNail)


module.exports = router;