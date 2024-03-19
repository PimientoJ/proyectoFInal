const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Calendario = require('../Models/Calendario');

//Usuario Rol: Estudiante, Jurado, Director/coodirector
exports.obtenerDatosCalendario = async(req, res) => {
    try {
        const calendario = await Calendario.find({ estado: true });
        res.json(calendario);
    } catch (error) {
        res.json(error);
    }
};
//Métodos de administrador
exports.agregarCalendario = async(req, res) => {
    try {
        const { periodo, año, proceso } = req.body;
        console.log(req.body);

        const nuevoDatoCalendario = new Calendario(req.body);
        console.log(nuevoDatoCalendario);
        await nuevoDatoCalendario.save(); //Guarda en la base de datos
        res.json({ success: true, msj: 'Datos registrado exitosamente' });

    } catch (error) {
        res.json(error);
    }
};
//Metodo para agregar los procesos
exports.AgregarDatoCalendarioProceso = async(req, res) => {
    try {
        const id = req.params.id;
        const { proceso } = req.body;
        console.log("Procesos:", proceso);
        const aggProceso = await Calendario.findByIdAndUpdate(id, { $push: { proceso: proceso } });
        res.json({ msj: "Datos recibidos del proceso con exito" });
    } catch (error) {
        res.json(error);
    }

};
//Metodo para actualizar los datos
exports.actualizarDatoCalendario = async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await Calendario.findByIdAndUpdate(id, data);
        res.json({ msj: "Datos recibidos para actualizar" });
    } catch (error) {
        res.json(error);
    }

};
//Metodo para eliminar el registro agregado, solo se cambia el estado de el usuario a false
exports.eliminarDatoCalendario = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const eliminar = await Usuario.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({ msj: "Dato eliminado satisfactoriamente", isOk: true, eliminar });
    } catch (error) {
        res.status(200).json("Error");
    }

};