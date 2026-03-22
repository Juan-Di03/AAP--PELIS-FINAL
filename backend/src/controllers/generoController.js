const generoService = require('../services/generoService');

const getGeneros = async (req, res) => {
    try {
        const generos = await generoService.getGeneros();
        res.json(generos);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener géneros', error: error.message });
    }
};

const createGenero = async (req, res) => {
    try {
        const nuevoGenero = await generoService.createGenero(req.body);
        res.status(201).json(nuevoGenero);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear género', error: error.message });
    }
};

const updateGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const generoActualizado = await generoService.updateGenero(id, req.body);
        if (!generoActualizado) {
            return res.status(404).json({ msg: 'Género no encontrado' });
        }
        res.json(generoActualizado);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar género', error: error.message });
    }
};

module.exports = { getGeneros, createGenero, updateGenero };
