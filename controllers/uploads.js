const path = require('path');
const fs   = require('fs');

const { response } = require("express");
const { subirArchivo } = require("../helpers");


const { Inmueble } = require("../models")


const cargarArchivo = async(req, res = response) => {
    // Imagenes
    try {
        //const nombre  = await subirArchivo( req.files, ['pdf'], 'textos' );
        const nombre  = await subirArchivo( req.files, undefined, 'img' );
        res.json({ nombre });
    } catch (msg) {
        res.status(400).json({msg });
    }   
}

const actualizarImagen = async(req, res = response) =>{
   

    const {id, collection } =  req.params;

    let modelo;

    switch ( collection ) {
        case 'inmuebles':

            modelo = await Inmueble.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No exsite un inmueble con el id ${id}`
                });
            }            
            
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

     // Limpiar imágenes previas
     if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', collection, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }

    const nombre  = await subirArchivo( req.files, undefined, collection );
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);
}


const mostarImagen = async(req, res = response) => {
    
    const {id, collection } =  req.params;

    let modelo;

    switch ( collection ) {
        case 'inmuebles':

            modelo = await Inmueble.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No exsite un inmueble con el id ${id}`
                });
            }            
            
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

     // Limpiar imágenes previas
     if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', collection, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile(pathImagen);
            
        }
    }

    const pathImagen = path.join( __dirname, '../assets/no-image.jpeg');

    res.sendFile(pathImagen);

}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostarImagen
}