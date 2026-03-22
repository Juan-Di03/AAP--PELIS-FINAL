const { Router } = require('express');
const { getTipos, createTipo, updateTipo } = require('../controllers/tipoController');
const Tipo = require('../models/Tipo');

const router = Router();

router.get('/', getTipos);
router.post('/', createTipo);
router.put('/:id', updateTipo);

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const borrado = await Tipo.findByIdAndDelete(id);
        if (!borrado) return res.status(404).json({ msg: 'No encontrado' });
        res.json({ msg: 'Eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar', error: error.message });
    }
});

module.exports = router;
