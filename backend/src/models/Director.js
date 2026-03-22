const { Schema, model } = require('mongoose');

const DirectorSchema = new Schema({
    nombres: { type: String, required: true, trim: true },
    estado: { type: String, enum: ['Activo', 'Inactivo'], required: true, default: 'Activo' }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
    versionKey: false
});

module.exports = model('Director', DirectorSchema);
