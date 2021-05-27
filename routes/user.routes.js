const { Router } = require('express');
const { getUser, postUser, putUser, deleteUser, patchUser } = require('../controllers/users.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExists, idexists } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUser);

router.put('/:id', [
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(idexists),
    check('rol', 'El rol es inválido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], putUser);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es inválido').isEmail(),
    check('correo').custom(emailExists),
    check('pass', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    check('rol', 'El rol es inválido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], postUser);

router.delete('/:id', [
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(idexists),
    validarCampos
], deleteUser);

router.patch('/', patchUser);

module.exports = router;