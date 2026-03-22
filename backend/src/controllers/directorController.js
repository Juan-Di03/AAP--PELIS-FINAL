const directorService = require('../services/directorService');

const getDirectores = async (req, res) => {
    try {
        const directores = await directorService.getDirectores();
        res.json(directores);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener directores', error: error.message });
    }
};

const createDirector = async (req, res) => {
    try {
        const nuevoDirector = await directorService.createDirector(req.body);
        res.status(201).json(nuevoDirector);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear director', error: error.message });
    }
};

const updateDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const directorActualizado = await directorService.updateDirector(id, req.body);
        if (!directorActualizado) {
            return res.status(404).json({ msg: 'Director no encontrado' });
        }
        res.json(directorActualizado);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar director', error: error.message });
    }
};

module.exports = { getDirectores, createDirector, updateDirector };
