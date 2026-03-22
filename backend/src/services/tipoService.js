const Tipo = require('../models/Tipo');

const getTipos = async () => {
    const tipos = await Tipo.find();
    return tipos;
};

const createTipo = async (tipoData) => {
    const tipo = new Tipo(tipoData);
    await tipo.save();
    return tipo;
};

const updateTipo = async (id, tipoData) => {
    const tipoActualizado = await Tipo.findByIdAndUpdate(id, tipoData, { new: true });
    return tipoActualizado;
};

module.exports = { getTipos, createTipo, updateTipo };
