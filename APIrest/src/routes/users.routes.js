const { Router } = require("express"); // se crea un objeto donde se instacia
const ctrUser = require("../controllers/users.controller");
const autorizarUsuario = require("../middleware/auth.usuario");
const routerUsers = Router(); // Objeto

routerUsers.get("/datosUsuario", ctrUser.obtenerDatosUsuario);
routerUsers.get("/datosRolUsuario/:idUser/:idRol", ctrUser.obtenerRolUsuario);
routerUsers.get("/datosRolJurado", ctrUser.obtenerUsuariosPorRolJurado);
routerUsers.post("/registarUsuario", ctrUser.agregarUsuario);
routerUsers.put("/registarRolUsuario/:id", ctrUser.agregarRolUsuario);
routerUsers.put("/actualizarUsuario/:id", ctrUser.actualizarUsuario);
routerUsers.delete("/eliminarUsuario/:id", ctrUser.eliminarUsuario);
routerUsers.post("/loginUsuario", ctrUser.logginUsuario);
routerUsers.get("/datosUsuarioLogueado/:id", autorizarUsuario, ctrUser.obtenerDatosUsuarioLogueado);
routerUsers.put("/actualizarPassword/:id", ctrUser.actualizarContraseña);
routerUsers.get("/datosUsuarioEstudiante", ctrUser.obtenerRolEstudiante);
routerUsers.get("/datosUsuarioJurado", ctrUser.obtenerRolJurado);
routerUsers.get("/datosUsuarios", ctrUser.obtenerDatosUsuario2);


module.exports = routerUsers;