const { Schema, model } = require('mongoose');

const GeneroSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    estado: { type: String, enum: ['Activo', 'Inactivo'], required: true, default: 'Activo' },
    descripcion: { type: String, required: false, trim: true }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
    versionKey: false
});

module.exports = model('Genero', GeneroSchema);
