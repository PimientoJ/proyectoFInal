const guardarArchivo = async(file, nombreArchivo, documento, tipoArchivo) => {

    const archivo = await file[documento]; //Se parametriza con el nombre del documento
    const resp = { isOk: false, error: null, nuevoNombre: null };

    if (archivo.mimetype == tipoArchivo) {
        //Guardar Archivo
        const ahora = Date.parse(Date());
        resp.nuevoNombre = nombreArchivo.replace(/ /g, "") + ahora + ".pdf";
        resp.error = await archivo.mv("./archivos/" + resp.nuevoNombre);
        if (resp.error) {
            return resp;
        } else {
            resp.isOk = true;
            return resp;
        }
    } else {
        resp.error = "Formato del archivo incorrecto, debe ser pdf"
        return resp;
    }
}

module.exports = guardarArchivo;