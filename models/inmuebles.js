
const { Schema, model } = require('mongoose');

const InmuebleSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    precio: {
        type: Number,
        default:0
        //required: [true, 'El precio es obligatorio']
    },
    coleccionnft: {
        type: Number,
        default:0
        //required: [true, 'El coleccion nft es obligatorio']
    },
    costonft: {
        type: Number,
        default:0
        //required: [true, 'El costo nft es obligatorio']
    },
    rentabilidad: {
        type: Number,
        default:0
        //required: [true, 'El rentabilidad es obligatorio']
    },
    plusvalia: {
        type: Number,
        default:0
        //required: [true, 'El plusvalia es obligatorio']
    },
    whitepaper: {
        type: String, 
        //required: [true, 'El whitepaper es obligatorio']       
    },
    img: {
        type: String,        
    },
    estado: {
        type: Boolean,
        default: true
    }
});

InmuebleSchema.methods.toJSON = function() {
    const { __v, _id, ...inmueble } = this.toObject();
    inmueble.uid = _id;
    return inmueble
}


/* Exporting the model to be used in other files. */
module.exports = model('Inmueble', InmuebleSchema)