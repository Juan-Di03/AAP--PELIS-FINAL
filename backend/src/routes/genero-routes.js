const { Router } = require('express');
const { getGeneros, createGenero, updateGenero } = require('../controllers/generoController');
const Genero = require('../models/Genero');

const router = Router();

router.get('/', getGeneros);
router.post('/', createGenero);
router.put('/:id', updateGenero);

// Añadiendo DELETE que hacía falta para completar el requerimiento del usuario
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const borrado = await Genero.findByIdAndDelete(id);
        if (!borrado) return res.status(404).json({ msg: 'No encontrado' });
        res.json({ msg: 'Eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar', error: error.message });
    }
});

module.exports = router;
