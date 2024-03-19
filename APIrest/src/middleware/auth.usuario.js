const Usuario = require('../Models/Usuario');
const jwt = require('jsonwebtoken');


const autenticacionUsuario = async(req, res, next) => {

    const strToken = req.headers.authorization;
    if (!strToken) {
        return res.json({ msj: "No se encontro token" });
    }
    try {
        const token = strToken.split(" ")[1];
        const palabras = "clavesecreta" //se debe cambiar, y usar en los ENV
            // const palabras = process.env.JWT_PASS; // deberia funcionar igual
        const llave = jwt.verify(token, palabras);
        const usuario = await Usuario.findById(llave._id);
        if (!usuario) {
            res.json({ msj: "Usuario no encontrado" });
        }
    } catch (error) {
        return res.json({ error });
    }
    next();
}

module.exports = autenticacionUsuario;