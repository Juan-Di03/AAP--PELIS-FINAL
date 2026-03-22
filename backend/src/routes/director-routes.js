const { Router } = require('express');
const { getDirectores, createDirector, updateDirector } = require('../controllers/directorController');
const Director = require('../models/Director');

const router = Router();

router.get('/', getDirectores);
router.post('/', createDirector);
router.put('/:id', updateDirector);

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const borrado = await Director.findByIdAndDelete(id);
        if (!borrado) return res.status(404).json({ msg: 'No encontrado' });
        res.json({ msg: 'Eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar', error: error.message });
    }
});

module.exports = router;
