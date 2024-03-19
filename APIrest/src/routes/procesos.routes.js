const { Router } = require("express");
const ctrProceso = require("../controllers/proceso.controller");
const routerProcesos = Router();

routerProcesos.get("/datosProcesos/:idCal", ctrProceso.ObtenerProceso);
routerProcesos.post("/agregarProcesos/:idCal", ctrProceso.AgregarProceso);
routerProcesos.put("/actualizarProcesos/:idCal/:idPro", ctrProceso.EditarProceso);
routerProcesos.get("/datoDelProceso/:idCal/:idPro", ctrProceso.ObtenerDatoProceso);
routerProcesos.delete("/eliminarProceso/:idCal/:idPro", ctrProceso.EliminarProceso);

module.exports = routerProcesos;