const { Schema, model } = require("mongoose");

const CalendarioSchema = new Schema({
    periodo: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    proceso: [{
        nombre: String,
        fechaEntrega: Date,
        fechaSesioncomite: Date,
        fechaResultado: Date
    }],
    estado: {
        type: Boolean,
        default: true
    }
});


module.exports = model("Calendario", CalendarioSchema);