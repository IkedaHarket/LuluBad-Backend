const {Router} = require('express');
const { param, check } = require('express-validator');
const { forgotPass, banearUsuario, modifyUsers } = require('../controllers/user');
const { verifyUserId, verifyEmailNoReg, verifyEmailReg } = require('../helpers/verifyUsers');


const {validarCampos} = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = new Router();


router.post('/forgot',[
    check('correo','El correo no es valido').isEmail(),
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('correo').custom(verifyEmailNoReg),
    validarCampos
],forgotPass)

router.put('/ban/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyUserId),
    validarCampos
],banearUsuario)

router.put('/modify',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre','El nombre debe ser de mas de 4 caracteres').isLength({min:4}),
    check('correo').custom(verifyEmailReg),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('password','La contraseña debe ser de mas de 6 caracteres').isLength({min:6}),
    check('newPassword','La nueva contraseña es obligatoria').not().isEmpty(),
    check('newPassword','La nueva contraseña debe ser de mas de 6 caracteres').isLength({min:6}),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('edad','La edad es obligatoria').not().isEmpty(),
    validarCampos
],modifyUsers)

module.exports = router;
