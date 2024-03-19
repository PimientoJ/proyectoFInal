const mongoose = require('mongoose');

const conexionDB = async() => { //funsión asíncrona
    try {
        const DB = await mongoose.connect('mongodb+srv://proyectofinal:LHiFpp0txN396C0O@cluster0.uyrv3d3.mongodb.net/proyectofinal');
        console.log("Conexion de forma satisfactoria a la DB:", DB.connection.name);

    } catch (error) {
        console.log(error);
    }
}

module.exports = conexionDB;