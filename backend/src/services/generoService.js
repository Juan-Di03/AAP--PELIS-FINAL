const Genero = require('../models/Genero');

const getGeneros = async () => {
    const generos = await Genero.find();
    return generos;
};

const createGenero = async (generoData) => {
    const genero = new Genero(generoData);
    await genero.save();
    return genero;
};

const updateGenero = async (id, generoData) => {
    const generoActualizado = await Genero.findByIdAndUpdate(id, generoData, { new: true });
    return generoActualizado;
};

module.exports = { getGeneros, createGenero, updateGenero };
