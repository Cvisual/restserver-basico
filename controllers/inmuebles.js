const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Inmueble } = require('../models')



/**
 * It returns a list of inmuebles.
 * @param req - The request object.
 * @param [res] - The response object.
 */
const obtenerInmuebles =  async(req, res=response) => {

    const { limite = 5, desde = 0} = req.query;
    const query = { estado :true }

    /* A way to execute two promises in parallel. */
    const [ total, inmuebles ] = await Promise.all([
        Inmueble.countDocuments(query),
        Inmueble.find(query)
        .skip( Number( desde ) )
        .limit( Number( limite ) )
    ]);


    res.json({                        
        total,
        inmuebles,        
    });
}


/**
 * It's a function that takes in a request and a response, and returns a JSON object of the inmueble
 * with the id that was passed in the request
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param [res] - The response object.
 */
const obtenerInmueble = async(req, res = response ) => {
    const {id} = req.params;

    const inmueble = await Inmueble.findById(id);

    res.json(inmueble);
}

/**
 * It creates a new inmueble in the database
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param [res] - The response object.
 */
const crearInmueble = async(req, res = response) =>{
    const nombre  = req.body.nombre.toUpperCase();

    const {precio, coleccionnft, costonft, rentabilidad, plusvalia } = req.body;

    const inmuebleDB = await Inmueble.findOne({ nombre });

    //Validar si existe el inmueble
    if( inmuebleDB) {
        return res.status(400).json({
            msg: `El inmueble  ${ inmuebleDB.nombre}, ya existe `
        })
    }

    // Generar datos a guardar
    const data = {
        nombre,
        precio, 
        coleccionnft, 
        costonft, 
        rentabilidad, 
        plusvalia,                  
    }
    const inmueble =  new Inmueble( data );

    // Todo: cargar imagenes al servidor

    /* const imagen  = await subirArchivo( req.files, undefined, 'inmuebles' );
    inmueble.img = imagen; */

    //Guardar en base de datos
    await inmueble.save();

    res.status(201).json(inmueble);  
}

const actualizarInmueble =  async( req, res = response) => {

    const {id} = req.params;

    const {estado, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();

    const inmueble =await Inmueble.findByIdAndUpdate(id, data, {new: true});

    res.status(201).json(inmueble);
}

const borrarInmueble = async (req, res= response) => {
    const {id} = req.params;

    const inmueble = await Inmueble.findByIdAndUpdate(id, {estado: false }, {new: true});

    res.json({                        
        inmueble
    });

}


module.exports = {
    crearInmueble,
    obtenerInmuebles,
    obtenerInmueble,
    actualizarInmueble,
    borrarInmueble
}