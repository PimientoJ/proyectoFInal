const Calendario = require('../Models/Calendario');

exports.ObtenerProceso = async(req, res) => {
    try {
        if (req.params.idCal) {
            const idCal = req.params.idCal;
            const calendario = await Calendario.findById(idCal);
            res.json(calendario.proceso);
        } else {
            res.status(400).json({ error: 'Se debe enviar el id del calendario' });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.AgregarProceso = async(req, res) => {
    try {
        if (req.params.idCal && req.body) {
            const idCal = req.params.idCal;
            const proceso = req.body;
            console.log(idCal, proceso);
            const aggProceso = await Calendario.findById(idCal, { proceso: proceso });
            console.log("Calendario:", aggProceso);
            aggProceso.proceso.push(proceso); //agg un nuevo objeto en el arreglo de calendario
            await aggProceso.save();
            res.json({ isOk: true });
        } else {
            res.status(400).json({ error: 'Datos incompletos' });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.EliminarProceso = async(req, res) => {

    try {
        if (req.params.idCal && req.params.idPro) {
            const idCal = req.params.idCal;
            const idPro = req.params.idPro;
            const calendario = await Calendario.findById(idCal);

            for (let index = 0; index < calendario.proceso.length; index++) {
                /*  console.log(calendario.proceso[index]);*/
                if (calendario.proceso[index]._id == idPro) {
                    calendario.proceso.splice(index, 1);
                }
            }
            await calendario.save();
            res.json({ isOk: true });

        } else {
            res.status(400).json({ error: "Debe ingresar el id del calendario y del proceso a eliminar" });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}
exports.ObtenerDatoProceso = async(req, res) => {
    try {
        if (req.params.idCal && req.params.idPro) {
            const idCal = req.params.idCal;
            const idPro = req.params.idPro;
            const calendario = await Calendario.findById(idCal);

            for (let index = 0; index < calendario.proceso.length; index++) {
                if (calendario.proceso[index]._id == idPro) {
                    res.json(calendario.proceso[index]);
                }
            }
        } else {
            res.status(400).json({ error });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}
exports.EditarProceso = async(req, res) => {

    try {
        if (req.params.idCal && req.params.idPro && req.body) {
            const idCal = req.params.idCal;
            const idPro = req.params.idPro;
            const data = req.body;
            const calendario = await Calendario.findById(idCal);

            for (let index = 0; index < calendario.proceso.length; index++) {
                if (calendario.proceso[index]._id == idPro) {
                    Object.assign(calendario.proceso[index], data);
                }
            }
            await calendario.save();
            res.json({ isOk: true });

        } else {
            res.status(400).json({ error: "Debe ingresar todos los datos" });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}