require('dotenv').config();
const Server = require('./models/server');


/* Creating a new instance of the Server class. */
const server = new Server();

/* Calling the listen method on the server object. */
server.listen();