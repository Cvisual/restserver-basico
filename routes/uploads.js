
const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');


const router = Router();


router.post('/', validarArchivoSubir, cargarArchivo );

router.put('/:collection/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => coleccionesPermitidas( c ,['inmuebles'] ) ),
    validarCampos
], actualizarImagen);

router.get('/:collection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => coleccionesPermitidas( c ,['inmuebles'] ) ),
    validarCampos
], mostarImagen);


module.exports = router;