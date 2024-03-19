const { Schema, model } = require("mongoose");


const ProyectoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    estudiante: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        autopopulate: true
    }],
    jurado: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        autopopulate: true
    }],
    director: {
        type: String
    },
    codirector: {
        type: String
    },
    proceso: {
        type: String,
        required: true
    },
    lineaInvestigacion: {
        type: String,
    },
    semilleroInvestigacion: {
        type: String
    },
    estadoProceso: {
        type: String,
        required: true
    },
    nombreDocumento: {
        type: String,
        required: true
    },
    nota: {
        type: Number
    },
    estado: {
        type: Boolean,
        default: true
    },
    comentario: {
        type: String
    },
    formatosolicituddirect: {
        type: String
    },
});

ProyectoSchema.plugin(require('mongoose-autopopulate'));
module.exports = model("Proyecto", ProyectoSchema);