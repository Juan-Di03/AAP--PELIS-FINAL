const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares Globales
app.use(cors());
app.use(express.json());

app.use('/api/generos', require('./routes/genero-routes'));
app.use('/api/directores', require('./routes/director-routes'));
app.use('/api/productoras', require('./routes/productora-routes'));
app.use('/api/tipos', require('./routes/tipo-routes'));
app.use('/api/medias', require('./routes/media-routes'));

// Respuesta base
app.get('/', (req, res) => {
    res.json({ msg: 'API de Administrador de Películas operativa.' });
});

module.exports = app;
