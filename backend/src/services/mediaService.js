const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const getMedias = async () => {
    const medias = await Media.find()
        .populate('genero', 'nombre')
        .populate('director', 'nombres')
        .populate('productora', 'nombre')
        .populate('tipo', 'nombre');
    return medias;
};

const createMedia = async (mediaData) => {
    const { serial, url, genero, director, productora, tipo } = mediaData;

    const existeMedia = await Media.findOne({ $or: [{ serial }, { url }] });
    if (existeMedia) {
        throw new Error('El serial o URL ingresados ya existen.');
    }

    const valGenero = await Genero.findOne({ _id: genero, estado: 'Activo' });
    if (!valGenero) throw new Error('Género inválido o inactivo.');

    const valDirector = await Director.findOne({ _id: director, estado: 'Activo' });
    if (!valDirector) throw new Error('Director inválido o inactivo.');

    const valProductora = await Productora.findOne({ _id: productora, estado: 'Activo' });
    if (!valProductora) throw new Error('Productora inválida o inactiva.');

    const valTipo = await Tipo.findById(tipo);
    if (!valTipo) throw new Error('Tipo no existe.');

    const media = new Media(mediaData);
    await media.save();
    return media;
};

const updateMedia = async (id, mediaData) => {
    const { genero, director, productora, tipo } = mediaData;

    if (genero) {
        const val = await Genero.findOne({ _id: genero, estado: 'Activo' });
        if (!val) throw new Error('Género inválido o inactivo.');
    }
    if (director) {
        const val = await Director.findOne({ _id: director, estado: 'Activo' });
        if (!val) throw new Error('Director inválido o inactivo.');
    }
    if (productora) {
        const val = await Productora.findOne({ _id: productora, estado: 'Activo' });
        if (!val) throw new Error('Productora inválida o inactiva.');
    }
    if (tipo) {
        const val = await Tipo.findById(tipo);
        if (!val) throw new Error('Tipo no existe.');
    }

    const mediaActualizada = await Media.findByIdAndUpdate(id, mediaData, { new: true });
    return mediaActualizada;
};

const deleteMedia = async (id) => {
    const mediaBorrada = await Media.findByIdAndDelete(id);
    return mediaBorrada;
};

module.exports = { getMedias, createMedia, updateMedia, deleteMedia };
