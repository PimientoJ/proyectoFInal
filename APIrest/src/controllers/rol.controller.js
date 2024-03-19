const Rol = require('../Models/Rol');

exports.obtenerRoles = async(req, res) => {
    try {
        const rol = await Rol.find();
        res.json(rol);
    } catch (error) {
        res.json(error);
    }
};
exports.agregarRol = async(req, res) => {
    try {
        const { nombre } = req.body;
        console.log(req.body);

        const nuevoDatoRol = new Rol(req.body);
        console.log(nuevoDatoRol);
        await nuevoDatoRol.save(); //Guarda en la base de datos
        res.json({ success: true, msj: 'Datos del rol registrado exitosamente' })

    } catch (error) {
        res.json(error);
    }
};
exports.obtenerRol = async(req, res) => {
    try {
        const id = req.params.id;
        const rol = await Rol.findById(id);
        res.json(rol.nombre);
    } catch (error) {
        res.json(error);
    }
};