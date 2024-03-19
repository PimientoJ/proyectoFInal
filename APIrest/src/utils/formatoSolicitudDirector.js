const guardarFormatoSolicitudDirector = async(file, nombredocumento, archivo, tipodocumento) => {

    const documento = await file[archivo]; //Se parametriza con el nombre del documento
    console.log(documento);
    const resp = { isOk: false, error: null, nuevoNombreFormato: null };

    /* if (documento.mimetype == tipodocumento) {
         //Guardar documento
         resp.nuevoNombreFormato = "FormatoSolicitudDirectoryCodirector" + "_" + nombredocumento.replace(/ /g, "") + ".pdf";
         resp.error = await documento.mv("./DocumentosFormatosSolicitud/" + resp.nuevoNombreFormato);
         if (resp.error) {
             return resp;
         } else {
             resp.isOk = true;
             return resp;
         }
     } else {
         resp.error = "Formato del documento incorrecto, debe ser pdf"
         return resp;
     }*/
}

module.exports = guardarFormatoSolicitudDirector;