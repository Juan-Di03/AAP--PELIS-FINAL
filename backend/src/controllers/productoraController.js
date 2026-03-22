const productoraService = require('../services/productoraService');

const getProductoras = async (req, res) => {
    try {
        const productoras = await productoraService.getProductoras();
        res.json(productoras);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener productoras', error: error.message });
    }
};

const createProductora = async (req, res) => {
    try {
        const nuevaProductora = await productoraService.createProductora(req.body);
        res.status(201).json(nuevaProductora);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear productora', error: error.message });
    }
};

const updateProductora = async (req, res) => {
    try {
        const { id } = req.params;
        const productoraActualizada = await productoraService.updateProductora(id, req.body);
        if (!productoraActualizada) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }
        res.json(productoraActualizada);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar productora', error: error.message });
    }
};

module.exports = { getProductoras, createProductora, updateProductora };
