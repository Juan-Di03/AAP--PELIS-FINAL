const { Router } = require('express');
const { getMedias, createMedia, updateMedia } = require('../controllers/mediaController');
const Media = require('../models/Media');

const router = Router();

router.get('/', getMedias);
router.post('/', createMedia);
router.put('/:id', updateMedia);

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const borrado = await Media.findByIdAndDelete(id);
        if (!borrado) return res.status(404).json({ msg: 'Producción no encontrada' });
        res.json({ msg: 'Producción eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar producción', error: error.message });
    }
});

module.exports = router;
