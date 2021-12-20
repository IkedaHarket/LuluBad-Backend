const {Router} = require('express');
const { check,param } = require('express-validator');
const { getNailsShape, getNailShape, addNailShape, stateNailShape, modNailShape,deleteNailShape } = require('../controllers/nailShape');

const { verifyNailShapeId } = require('../helpers/verifyNails');


const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = new Router();

router.get('/',getNailsShape);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailShapeId),
    validarCampos
],getNailShape)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],addNailShape)

router.put('/state/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailShapeId),
    validarCampos
],stateNailShape)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailShapeId),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],modNailShape)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNailShapeId),
    validarCampos
],deleteNailShape)





module.exports = router