const { Schema, model } = require('mongoose');

const TipoSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: false, trim: true }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
    versionKey: false
});

module.exports = model('Tipo', TipoSchema);
