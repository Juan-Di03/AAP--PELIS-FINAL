const Productora = require('../models/Productora');

const getProductoras = async () => {
    const productoras = await Productora.find();
    return productoras;
};

const createProductora = async (productoraData) => {
    const productora = new Productora(productoraData);
    await productora.save();
    return productora;
};

const updateProductora = async (id, productoraData) => {
    const productoraActualizada = await Productora.findByIdAndUpdate(id, productoraData, { new: true });
    return productoraActualizada;
};

module.exports = { getProductoras, createProductora, updateProductora };
