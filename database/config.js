
const mongoose = require('mongoose');

const dbConnection = async () => {

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`base de datos conectada a: ${conn.connection.host}`)

    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de conectarse a la base de datos');
    }

}

module.exports = dbConnection
