const { isValidObjectId } = require("mongoose");

const Role = require('../models/role');
const Usuario = require('../models/usuario');

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
        console.log(`El id: ${id} es valido`);
        // id valido
        return `El id: ${id} es valido`;
    } else {
        const existeUsuario = await Usuario.findById(id);  
        if( existeUsuario ) {
            throw new Error(`El id no existe: ${id}`);
        }
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}