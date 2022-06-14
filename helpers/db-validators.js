const { isValidObjectId } = require("mongoose");
const { Inmueble,Usuario } = require("../models");

const Role = require('../models/role');


// Verificar si el rol es valido
const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

// Verificar si el correo existe
const existeEmail = async (correo = '') => {
    
    const existeMail = await Usuario.findOne({correo});

    if( existeMail ) {
        throw new Error(`El correo: ${correo} ya esta registrado`);
    }
}

// Verificar si el correo existe
const existeUsuarioPorId = async (id = '') => {   
    const esMongoID = isValidObjectId(id); 
    if (esMongoID) {
        //console.log(`El id: ${id} es valido`);
        // id valido
        return `El id: ${id} es valido`;
    } else {
        const existeUsuario = await Usuario.findById(id);  
        if( existeUsuario ) {
            throw new Error(`El id no existe: ${id}`);
        }
    }
}

// Verificar si el inmueble existe
const existeInmueblePorId = async (id = '') => {   
    // Verificar si el inmueble existe    
    const existeInmueble = await Inmueble.findById(id);  
    if( !existeInmueble ) {
        throw new Error(`El id no existe: ${id}`);
    }    
}

// Varificar la colecciones permitidad
const coleccionesPermitidas =  ( collection = '', colecciones = []) =>{

    const incluida = colecciones.includes(collection);
    if (!incluida) {
        throw new Error(`La coleccion ${collection} no es permitidad ${colecciones}`);
    }

    return true;

}


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeInmueblePorId,
    coleccionesPermitidas
}