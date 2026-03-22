import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axios-config';

const TipoView = () => {
    const [tipos, setTipos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idEdit, setIdEdit] = useState(null);

    const listarTipos = async () => {
        try {
            const { data } = await axiosInstance.get('/tipos');
            setTipos(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        listarTipos();
    }, []);

    const guardarTipo = async (e) => {
        e.preventDefault();
        try {
            const payload = { nombre, descripcion };
            if (idEdit) {
                await axiosInstance.put(`/tipos/${idEdit}`, payload);
                setIdEdit(null);
            } else {
                await axiosInstance.post('/tipos', payload);
            }
            setNombre('');
            setDescripcion('');
            listarTipos();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (t) => {
        setIdEdit(t._id);
        setNombre(t.nombre);
        setDescripcion(t.descripcion || '');
    };

    const eliminarTipo = async (id) => {
        if (window.confirm('¿Desea eliminar este tipo?')) {
            try {
                await axiosInstance.delete(`/tipos/${id}`);
                listarTipos();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card shadow-sm mb-4">
                        <div className={`card-header text-white ${idEdit ? 'bg-warning text-dark' : 'bg-info'}`}>
                            <h5 className="mb-0">{idEdit ? 'Editar Tipo' : 'Nuevo Tipo'}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={guardarTipo}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea className="form-control" rows="2" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className={`btn w-100 ${idEdit ? 'btn-warning text-dark' : 'btn-info text-white'}`}>
                                        {idEdit ? 'Actualizar' : 'Guardar'}
                                    </button>
                                    {idEdit && <button type="button" className="btn btn-secondary" onClick={() => setIdEdit(null)}>X</button>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <table className="table table-hover table-striped shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipos.map((t) => (
                                <tr key={t._id}>
                                    <td>{t.nombre}</td>
                                    <td>{t.descripcion}</td>
                                    <td className="d-flex gap-2">
                                        <button className="btn btn-sm btn-outline-info" onClick={() => handleEdit(t)}>✎</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarTipo(t._id)}>🗑</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TipoView;
