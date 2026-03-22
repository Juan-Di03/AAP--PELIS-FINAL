import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axios-config';

const DirectorView = () => {
    const [directores, setDirectores] = useState([]);
    const [nombres, setNombres] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [idEdit, setIdEdit] = useState(null);

    const listarDirectores = async () => {
        try {
            const { data } = await axiosInstance.get('/directores');
            setDirectores(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        listarDirectores();
    }, []);

    const guardarDirector = async (e) => {
        e.preventDefault();
        try {
            const payload = { nombres, estado };
            if (idEdit) {
                await axiosInstance.put(`/directores/${idEdit}`, payload);
                setIdEdit(null);
            } else {
                await axiosInstance.post('/directores', payload);
            }
            setNombres('');
            setEstado('Activo');
            listarDirectores();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (dir) => {
        setIdEdit(dir._id);
        setNombres(dir.nombres);
        setEstado(dir.estado);
    };

    const eliminarDirector = async (id) => {
        if (window.confirm('¿Desea eliminar este director?')) {
            try {
                await axiosInstance.delete(`/directores/${id}`);
                listarDirectores();
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
                        <div className={`card-header text-white ${idEdit ? 'bg-warning text-dark' : 'bg-success'}`}>
                            <h5 className="mb-0">{idEdit ? 'Editar Director' : 'Nuevo Director'}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={guardarDirector}>
                                <div className="mb-3">
                                    <label className="form-label">Nombres</label>
                                    <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className={`btn w-100 ${idEdit ? 'btn-warning' : 'btn-success'}`}>
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
                                <th>Nombres</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {directores.map((dir) => (
                                <tr key={dir._id}>
                                    <td>{dir.nombres}</td>
                                    <td>{dir.estado}</td>
                                    <td className="d-flex gap-2">
                                        <button className="btn btn-sm btn-outline-info" onClick={() => handleEdit(dir)}>✎</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarDirector(dir._id)}>🗑</button>
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

export default DirectorView;
