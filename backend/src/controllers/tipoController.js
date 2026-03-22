const tipoService = require('../services/tipoService');

const getTipos = async (req, res) => {
    try {
        const tipos = await tipoService.getTipos();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener tipos', error: error.message });
    }
};

const createTipo = async (req, res) => {
    try {
        const nuevoTipo = await tipoService.createTipo(req.body);
        res.status(201).json(nuevoTipo);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear tipo', error: error.message });
    }
};

const updateTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoActualizado = await tipoService.updateTipo(id, req.body);
        if (!tipoActualizado) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        res.json(tipoActualizado);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar tipo', error: error.message });
    }
};

module.exports = { getTipos, createTipo, updateTipo };
