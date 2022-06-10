
const { Router } = require('express');
const { check } = require('express-validator');


// Validaciones
const { validarCampos  } = require('../middlewares/validar-campos')
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/',  usuariosGet );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( existeEmail ),
    check('password', 'El password es obligatorio y debe contener mas de 6 letras').isLength(6),
    //check('rol', 'No es un rol permitido').isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuariosPut);

router.patch('/',  usuariosPatch);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],  usuariosDelete);


module.exports = router;