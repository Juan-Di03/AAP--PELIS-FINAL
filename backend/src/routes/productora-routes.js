const { Router } = require('express');
const { getProductoras, createProductora, updateProductora } = require('../controllers/productoraController');
const Productora = require('../models/Productora');

const router = Router();

router.get('/', getProductoras);
router.post('/', createProductora);
router.put('/:id', updateProductora);

// DELETE directo en la ruta
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const borrado = await Productora.findByIdAndDelete(id);
        
        if (!borrado) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }
        
        res.json({ msg: 'Productora eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar la productora', error: error.message });
    }
});

module.exports = router;
