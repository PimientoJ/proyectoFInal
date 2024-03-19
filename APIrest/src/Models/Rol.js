const { Schema, model } = require("mongoose");

const RolSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }
});


module.exports = model("Rol", RolSchema);