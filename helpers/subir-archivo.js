const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png','jpg','jpeg','gif', 'pdf'], carpeta = '' ) => {
    
    //const { archivo } = files;

    //console.log('desde subir archivo', files.archivo);
    //console.log('desde subir archivo', archivo);


    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        //console.log('desde subir archivo, new promise', archivo);

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        //console.log(extension);

        // Validar la extension
         if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`);
        } /* else{
            console.log('desde la validacion de extensones', extension);
        } */
        
        const nombreTemp = uuidv4() + '.' + extension;
        //console.log('nombre temp', nombreTemp);

        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );
        //console.log('ruta de carga', uploadPath);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve( nombreTemp );
        });

    });

}



module.exports = {
    subirArchivo
}