const {Router} = require('express');
const { check } = require('express-validator');

const { register } = require('../controllers/auth');
const { verificarCorreoUsuario } = require('../helpers/verifyUsers');
const {validarCampos} = require('../middlewares/validarCampos');

// const { validarJWT } = require('../middlewares/validarJWT');

const router = new Router();


router.post('/register',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre','El nombre debe ser de mas de 4 caracteres').isLength({min:4}),
    check('correo','El correo no es valido').isEmail(),
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('correo').custom(verificarCorreoUsuario),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('password','El password debe ser de mas de 6 caracteres').isLength({min:6}),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('edad','La edad es obligatoria').not().isEmpty(),
    validarCampos
],register)


module.exports = router;
