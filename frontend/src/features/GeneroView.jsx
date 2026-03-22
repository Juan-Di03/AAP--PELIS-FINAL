import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axios-config';

const GeneroView = () => {
    const [generos, setGeneros] = useState([]);
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [descripcion, setDescripcion] = useState('');
    const [idEdit, setIdEdit] = useState(null);

    const listarGeneros = async () => {
        try {
            const { data } = await axiosInstance.get('/generos');
            setGeneros(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        listarGeneros();
    }, []);

    const guardarGenero = async (e) => {
        e.preventDefault();
        try {
            const payload = { nombre, estado, descripcion };
            if (idEdit) {
                await axiosInstance.put(`/generos/${idEdit}`, payload);
                setIdEdit(null);
            } else {
                await axiosInstance.post('/generos', payload);
            }
            setNombre('');
            setDescripcion('');
            setEstado('Activo');
            listarGeneros();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (gen) => {
        setIdEdit(gen._id);
        setNombre(gen.nombre);
        setEstado(gen.estado);
        setDescripcion(gen.descripcion || '');
    };

    const handleCancelarEdit = () => {
        setIdEdit(null);
        setNombre('');
        setEstado('Activo');
        setDescripcion('');
    };

    // Nota: Aunque el Backend tenga delete, solo lo habilitaremos si es necesario. 
    // Por ahora implementamos la vista de botones de acción.
    const eliminarGenero = async (id) => {
        if (window.confirm('¿Desea eliminar este género?')) {
            try {
                // El backend original no tiene DELETE para genero en las rutas que clonamos, 
                // pero si lo agregamos en nuestra refactorización, lo usamos.
                // Verificando rutas... agregaremos delete en el backend si no está.
                await axiosInstance.delete(`/generos/${id}`);
                listarGeneros();
            } catch (error) {
                 console.error(error);
                 alert('Error al intentar eliminar. Verifique si el backend permite DELETE.');
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card shadow-sm mb-4">
                        <div className={`card-header text-white ${idEdit ? 'bg-warning text-dark' : 'bg-primary'}`}>
                            <h5 className="mb-0">{idEdit ? 'Editar Género' : 'Nuevo Género'}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={guardarGenero}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea className="form-control" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className={`btn w-100 ${idEdit ? 'btn-warning' : 'btn-primary'}`}>
                                        {idEdit ? 'Actualizar' : 'Guardar'}
                                    </button>
                                    {idEdit && <button type="button" className="btn btn-secondary" onClick={handleCancelarEdit}>X</button>}
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
                                <th>Estado</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generos.map((gen) => (
                                <tr key={gen._id}>
                                    <td>{gen.nombre}</td>
                                    <td>{gen.estado}</td>
                                    <td>{gen.descripcion}</td>
                                    <td className="d-flex gap-2">
                                        <button className="btn btn-sm btn-outline-info" onClick={() => handleEdit(gen)}>✎</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarGenero(gen._id)}>🗑</button>
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

export default GeneroView;
