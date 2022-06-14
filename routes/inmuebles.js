
const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { crearInmueble, 
        obtenerInmuebles, 
        obtenerInmueble, 
        actualizarInmueble,
        borrarInmueble
} = require('../controllers/inmuebles');

const { existeInmueblePorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares/');


const router = Router();

//Info:  todos los inmuebles
router.get('/', obtenerInmuebles)

//Info:  obtener un inmueble
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeInmueblePorId ),
    validarCampos
],obtenerInmueble)

//Info:  Crear inmueble -  privado persona con un token valido Admin
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    
], crearInmueble );

//Info:  actualizar un inmueble  -  privado persona con un token valido Admin
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeInmueblePorId ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarInmueble)

//Info:  borrar un inmueble  -  privado persona con un token valido Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeInmueblePorId ),    
    validarCampos
],borrarInmueble)




module.exports = router;