const { Schema, model } = require('mongoose');

const ProductoraSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    estado: { type: String, enum: ['Activo', 'Inactivo'], required: true, default: 'Activo' },
    slogan: { type: String, required: false, trim: true },
    descripcion: { type: String, required: false, trim: true }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
    versionKey: false
});

module.exports = model('Productora', ProductoraSchema);
