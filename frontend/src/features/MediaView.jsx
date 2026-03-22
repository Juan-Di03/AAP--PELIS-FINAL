import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axios-config';

const MediaView = () => {
    const [medias, setMedias] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [idEdit, setIdEdit] = useState(null);

    const [valoresForm, setValoresForm] = useState({
        serial: '', titulo: '', sinopsis: '', url: '', imagen: '', anioEstreno: '',
        genero: '', director: '', productora: '', tipo: ''
    });

    const { serial, titulo, sinopsis, url, imagen, anioEstreno, genero, director, productora, tipo } = valoresForm;

    const listarTodo = async () => {
        try {
            const [respMedia, respGen, respDir, respProd, respTipo] = await Promise.all([
                axiosInstance.get('/medias'),
                axiosInstance.get('/generos'),
                axiosInstance.get('/directores'),
                axiosInstance.get('/productoras'),
                axiosInstance.get('/tipos')
            ]);
            setMedias(respMedia.data);
            setGeneros(respGen.data.filter(g => g.estado === 'Activo' || (idEdit && g._id === valoresForm.genero)));
            setDirectores(respDir.data.filter(d => d.estado === 'Activo' || (idEdit && d._id === valoresForm.director)));
            setProductoras(respProd.data.filter(p => p.estado === 'Activo' || (idEdit && p._id === valoresForm.productora)));
            setTipos(respTipo.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        listarTodo();
    }, [idEdit]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const guardarMedia = async (e) => {
        e.preventDefault();
        try {
            if (idEdit) {
                await axiosInstance.put(`/medias/${idEdit}`, valoresForm);
                setIdEdit(null);
            } else {
                await axiosInstance.post('/medias', valoresForm);
            }
            setValoresForm({
                serial: '', titulo: '', sinopsis: '', url: '', imagen: '', anioEstreno: '',
                genero: '', director: '', productora: '', tipo: ''
            });
            listarTodo();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (m) => {
        setIdEdit(m._id);
        setValoresForm({
            serial: m.serial,
            titulo: m.titulo,
            sinopsis: m.sinopsis,
            url: m.url,
            imagen: m.imagen || '',
            anioEstreno: m.anioEstreno,
            genero: m.genero?._id || '',
            director: m.director?._id || '',
            productora: m.productora?._id || '',
            tipo: m.tipo?._id || ''
        });
    };

    const eliminarMedia = async (id) => {
        if (window.confirm('¿Desea eliminar esta producción?')) {
            try {
                await axiosInstance.delete(`/medias/${id}`);
                listarTodo();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className={`card-header text-white ${idEdit ? 'bg-warning text-dark' : 'bg-dark'}`}>
                    <h5 className="mb-0">{idEdit ? 'Editar Producción' : 'Administrar Producciones (Películas/Series)'}</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={guardarMedia} className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">Serial</label>
                            <input type="text" name="serial" value={serial} onChange={handleOnChange} className="form-control" required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Título</label>
                            <input type="text" name="titulo" value={titulo} onChange={handleOnChange} className="form-control" required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">URL Película</label>
                            <input type="url" name="url" value={url} onChange={handleOnChange} className="form-control" required />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Sinopsis</label>
                            <textarea name="sinopsis" value={sinopsis} onChange={handleOnChange} className="form-control" rows="2" required></textarea>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Imagen (URL)</label>
                            <input type="text" name="imagen" value={imagen} onChange={handleOnChange} className="form-control" />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Año Estreno</label>
                            <input type="number" name="anioEstreno" value={anioEstreno} onChange={handleOnChange} className="form-control" required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Género</label>
                            <select name="genero" value={genero} onChange={handleOnChange} className="form-select" required>
                                <option value="">Seleccione...</option>
                                {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Director</label>
                            <select name="director" value={director} onChange={handleOnChange} className="form-select" required>
                                <option value="">Seleccione...</option>
                                {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Productora</label>
                            <select name="productora" value={productora} onChange={handleOnChange} className="form-select" required>
                                <option value="">Seleccione...</option>
                                {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Tipo</label>
                            <select name="tipo" value={tipo} onChange={handleOnChange} className="form-select" required>
                                <option value="">Seleccione...</option>
                                {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                            </select>
                        </div>
                        <div className="col-12 text-end d-flex justify-content-end gap-2">
                            {idEdit && <button type="button" className="btn btn-secondary px-4" onClick={() => setIdEdit(null)}>Cancelar</button>}
                            <button type="submit" className={`btn px-5 ${idEdit ? 'btn-warning' : 'btn-primary'}`}>
                                {idEdit ? 'Actualizar Producción' : 'Crear Producción'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {medias.map(m => (
                    <div className="col" key={m._id}>
                        <div className="card h-100 shadow-sm border-0">
                            <img src={m.imagen || 'https://via.placeholder.com/300x450?text=No+Image'} className="card-img-top" alt={m.titulo} style={{ height: '400px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title text-truncate">{m.titulo}</h5>
                                <p className="card-text text-muted small" style={{ height: '60px', overflow: 'hidden' }}>{m.sinopsis}</p>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span className="badge bg-info text-dark">{m.genero?.nombre}</span>
                                    <span className="badge bg-secondary">{m.anioEstreno}</span>
                                </div>
                                <p className="mt-2 mb-0 small text-truncate"><b>Director:</b> {m.director?.nombres}</p>
                                <p className="small text-truncate"><b>Productora:</b> {m.productora?.nombre}</p>
                            </div>
                            <div className="card-footer bg-white border-0 d-flex gap-2">
                                <a href={m.url} target="_blank" rel="noreferrer" className="btn btn-outline-dark btn-sm flex-grow-1">Ver Online</a>
                                <button className="btn btn-outline-info btn-sm" onClick={() => handleEdit(m)}>✎</button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarMedia(m._id)}>🗑</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaView;
