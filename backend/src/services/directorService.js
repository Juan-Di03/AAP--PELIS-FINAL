const Director = require('../models/Director');

const getDirectores = async () => {
    const directores = await Director.find();
    return directores;
};

const createDirector = async (directorData) => {
    const director = new Director(directorData);
    await director.save();
    return director;
};

const updateDirector = async (id, directorData) => {
    const directorActualizado = await Director.findByIdAndUpdate(id, directorData, { new: true });
    return directorActualizado;
};

module.exports = { getDirectores, createDirector, updateDirector };
