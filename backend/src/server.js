require('dotenv').config();
const app = require('./app');
const { connectDatabase } = require('./config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    // 1. Iniciar conexión a base de datos
    await connectDatabase();

    // 2. Iniciar servidor Express
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Administrador inicializado en el puerto ${PORT}`);
    });
};

startServer();
