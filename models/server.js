const express = require('express')
const cors = require('cors');
const dbConnection = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app = express();
        // Lectura y parseo del body
        this.app.use( express.json() );
        //Lectura de variables en el archivo .env
        this.port = process.env.PORT;


        this.paths = {
            auth:       '/api/auth',
            usuarios:   '/api/usuarios',
            inmuebles:  '/api/inmuebles',
            uploads:    '/api/uploads'
        }

        // conectar a base de datos
        this.conectarDB();

        

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación 
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {
        // CORS
        this.app.use( cors() );

        //Directorio publico
        this.app.use( express.static('public') );

        // Fileupload -  Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    
    routes() {
       
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.usuarios, require('../routes/usuarios') );
        this.app.use( this.paths.inmuebles, require('../routes/inmuebles') );
        this.app.use( this.paths.uploads, require('../routes/uploads') );

    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto:', this.port)
        })
    }

}

module.exports = Server;