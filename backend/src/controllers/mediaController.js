const mediaService = require('../services/mediaService');

const getMedias = async (req, res) => {
    try {
        const medias = await mediaService.getMedias();
        res.json(medias);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener las producciones', error: error.message });
    }
};

const createMedia = async (req, res) => {
    try {
        const nuevaMedia = await mediaService.createMedia(req.body);
        res.status(201).json(nuevaMedia);
    } catch (error) {
        res.status(400).json({ msg: 'Error de validación al crear media', error: error.message });
    }
};

const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const mediaActualizada = await mediaService.updateMedia(id, req.body);
        if (!mediaActualizada) {
            return res.status(404).json({ msg: 'Media no encontrada' });
        }
        res.json(mediaActualizada);
    } catch (error) {
        res.status(400).json({ msg: 'Error de validación', error: error.message });
    }
};

const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const mediaBorrada = await mediaService.deleteMedia(id);
        if (!mediaBorrada) {
             return res.status(404).json({ msg: 'Media no encontrada' });
        }
        res.json({ msg: 'Media eliminada con éxito' });
    } catch (error) {
         res.status(500).json({ msg: 'Error al eliminar', error: error.message });
    }
};

module.exports = { getMedias, createMedia, updateMedia, deleteMedia };
