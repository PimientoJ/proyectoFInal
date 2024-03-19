const { Router } = require("express");
const ctrRol = require("../controllers/rol.controller");
const routerRol = Router();

routerRol.get("/datosRoles", ctrRol.obtenerRoles);
routerRol.get("/datoRol/:id", ctrRol.obtenerRol);
routerRol.post("/registarRol", ctrRol.agregarRol);

module.exports = routerRol;