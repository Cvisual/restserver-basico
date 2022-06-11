const express = require('express')
const cors = require('cors');
const dbConnection = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        // Lectura y parseo del body
        this.app.use( express.json() );
        //Lectura de variables en el archivo .env
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

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
    }

    
    routes() {
       
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.usuariosPath, require('../routes/usuarios') );

    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto:', this.port)
        })
    }

}

module.exports = Server;