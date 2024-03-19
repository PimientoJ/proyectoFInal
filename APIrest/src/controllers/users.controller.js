const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/Usuario');
const Rol = require('../Models/Rol');



//Metodo de obtener los datos para ingreso al sistema
exports.obtenerDatosUsuario = async(req, res) => {
        try {
            const usuario = await Usuario.find({ estado: true });
            res.json(usuario);
        } catch (error) {
            res.json(error);
        }
    }
    //Metodo de obtener los datos para ingreso al sistema 2
exports.obtenerDatosUsuario2 = async(req, res) => {
        try {
            const usuario = await Usuario.find({ estado: true }).populate({
                path: 'rol',
                select: 'nombre'
            });

            res.json(usuario);
        } catch (error) {
            res.json(error);
        }
    }
    //Método para mostrar el rol de cada usuario
exports.obtenerRolUsuario = async(req, res) => {
        try {
            if (req.params.idUser && req.params.idRol) {
                const idUser = req.params.idUser;
                const idRol = req.params.idRol;
                console.log(idUser, "&", idRol);
                const usuario = await Usuario.findById(idUser);

                for (let index = 0; index < usuario.rol.length; index++) {
                    if (usuario.rol[index]._id == idRol) {
                        res.json(usuario.rol[index]);
                    }
                }
            } else {
                res.status(400).json({ error });
            }

        } catch (error) {
            res.status(500).json({ error });
        }
    }
    //Método para enviar registros
exports.agregarUsuario = async(req, res) => {
    try {
        const { nombre, codigo, correo, celular, pass } = req.body;
        console.log(req.body);

        const userExists = await Usuario.findOne({ correo: req.body.correo });
        if (userExists) {
            res.json({ msj: "El usuario ya existe con el ID de correo electrónico proporcionado" });
        } else {
            const salt = await bcrypt.genSalt(10);
            //Encriptamos la clave
            const hashedPass = await bcrypt.hash(req.body.pass, salt);
            req.body.pass = hashedPass;
            // const nuevoUsuario = new Usuario({ nombre, codigo, rol, correo, celular, pass })
            const nuevoUsuario = new Usuario(req.body);
            await nuevoUsuario.save(); //Guarda en la base de datos
            res.json({ success: true, msj: 'Usuario registrado exitosamente', data: nuevoUsuario })
        }

    } catch (error) {
        res.json(error);
    }

};
exports.agregarRolUsuario = async(req, res) => {
    try {
        console.log("cuerpo:", req.body);
        const id = req.params.id;
        const { rol } = req.body;
        console.log("Rol usuario:", id);
        console.log("Rol que recibe:", rol);
        const aggRol = await Usuario.findByIdAndUpdate(id, { $push: { rol: rol } });
        //res.send(`${aggRol.name} updated`);
        res.json({ msj: "Rol del usuario agregado con exito" });
    } catch (error) {
        res.json(error);
    }
};
//Metodo para actualizar los datos
exports.actualizarUsuario = async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await Usuario.findByIdAndUpdate(id, data);
        res.json({ success: true, msj: "Datos recibidos para actualizar" });
    } catch (error) {
        res.json(error);
    }

};
//Metodo para eliminar los datos usuario, solo se cambia el estado de el usuario a false
exports.eliminarUsuario = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const eliminar = await Usuario.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({ msj: "Dato eliminado satisfactoriamente", isOk: true });
    } catch (error) {
        res.status(200).json("Error");
    }

};
//Inicio de sesion de usuario
exports.logginUsuario = async(req, res) => {
    try {
        const { correo, pass, rol } = req.body;
        console.log(req.body);

        if (correo && pass) {
            //Comprobar si el usuario existe o no
            const userExist = await Usuario.findOne({ correo: req.body.correo });
            if (!userExist) {
                res.json({ success: false, msj: 'Usuario o contraseña incorrecta' });
            } else {
                //Comprobar coincidencia de contraseña
                const confirmarPass = await bcrypt.compare(pass, userExist.pass);
                if (confirmarPass) {
                    const { _id, correo } = userExist;
                    const opt = {
                        expiresIn: '1d'
                    }
                    const palabras = "clavesecreta"
                    const token = jwt.sign({ _id, correo }, palabras, opt);
                    res.json({ "token": token, success: true, _id, msj: 'Inicio de sesion exitoso' });

                } else {
                    res.json({ token: null, success: false, msj: "Usuario o contraseña incorrecta" });
                }
            }
        }
    } catch (error) {
        res.json(error);
    }
};
//Datos del usuario Logueado
exports.obtenerDatosUsuarioLogueado = async(req, res) => {
    try {
        const id = req.params.id;
        const usuario = await Usuario.findById(id);
        res.json(usuario);
    } catch (error) {
        res.json(error);
    }
};

//Cambiar contraseña
exports.actualizarContraseña = async(req, res) => {
    try {
        const id = req.params.id;
        const pass = req.body.pass;

        const salt = await bcrypt.genSalt(10);
        console.log("salt", salt);
        const hashedPass = await bcrypt.hash(req.body.pass, salt);
        req.body.pass = hashedPass;

        await Usuario.findByIdAndUpdate(id, req.body);
        res.json({ isOk: true, msj: "Contraseña modificada correctamente" });

        /*  console.log("Datos que entran:", id, pass);
          const contraseña = await Usuario.findByIdAndUpdate(id, pass);
          if (contraseña) {
              //Encriptamos la clave
              const hashed = await bcrypt.hash(pass, saltRound);
              console.log(hashed);
              res.json({ isOk: true, msj: "Contraseña modificada correctamente" });
          } else {
              //Envia msj de error
              res.json({ isOk: false, msj: "La contraseña y la confirmacion son incorrectas" });
          }*/
    } catch (error) {
        res.json({ isOk: false, msj: "No se actualizo la contraseña" });
    }
}

//Metodo de obtener el nombre del usuario ya previamente registrado
exports.obtenerNombresUsuario = async(req, res) => {
    try {
        if (req.params.nombre) {
            console.log("nombreEstudianteRecibeParametro:", req.params.nombre)
            const nombreUsuario = req.params.nombre;
            console.log("nombreEstudiante:", nombreUsuario)
            const usuario = await Usuario.find({ nombre: nombreUsuario, estado: true, rol: Estudiante });
            console.log("nombreEstudiante:", usuario)
            res.json(usuario);
        } else {
            res.json("No se encuentra el nombre registrado");
        }
    } catch (error) {
        res.json(error);
    }
}

exports.obtenerUsuariosPorRolJurado = async(req, res) => {
    try {
        const usuarios = await Usuario.find({ estado: true })
            .populate({
                path: 'rol',
                select: 'nombre'
            });

        for (const usuario of usuarios) {
            for (const rol of usuario.rol) {
                console.log({ rol });
                if (rol.nombre === 'Jurado') {
                    return usuarios;
                }
            }
        }

        res.json(usuarios);
    } catch (error) {
        res.json(error);
    }
}

//Dividir usuario por rol estudiante
exports.obtenerRolEstudiante = async(req, res) => {
        try {
            const usuarioEstudiante = await Usuario.find({ estado: true, rol: ['656ab1832166f185397306a9'] });
            res.json(usuarioEstudiante);
        } catch (error) {
            res.json(error);
        }
    }
    //Dividir usuario por rol jurado
exports.obtenerRolJurado = async(req, res) => {
    try {
        const usuarioJurado = await Usuario.find({ estado: true, rol: ['656ab1922166f185397306ad'] });
        res.json(usuarioJurado);
    } catch (error) {
        res.json(error);
    }
}