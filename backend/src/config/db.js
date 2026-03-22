const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('La variable MONGO_URI no está definida en el entorno.');
        }
        await mongoose.connect(uri);
        console.log('✅ Conexión a MongoDB establecida de forma segura');
    } catch (error) {
        console.error('❌ Error crítico al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = { connectDatabase };
