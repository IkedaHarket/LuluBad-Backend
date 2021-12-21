const {Router} = require('express');
const { check,param } = require('express-validator');
const { getShoppingListItems, getShoppingListItem, addShoppingListItem, stateShoppingListItem, modShoppingListItem,deleteShoppingListItem } = require('../controllers/shoppingList');

const { verifyShoppingListItemId } = require('../helpers/verifyShoppingListItem');


const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = new Router();

router.get('/',getShoppingListItems);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyShoppingListItemId),
    validarCampos
],getShoppingListItem)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],addShoppingListItem)

router.put('/state/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyShoppingListItemId),
    validarCampos
],stateShoppingListItem)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyShoppingListItemId),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],modShoppingListItem)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyShoppingListItemId),
    validarCampos
],deleteShoppingListItem)





module.exports = router