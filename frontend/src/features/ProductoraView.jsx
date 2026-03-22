import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axios-config';

const ProductoraView = () => {
    const [productoras, setProductoras] = useState([]);
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [slogan, setSlogan] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idEdit, setIdEdit] = useState(null);

    const listarProductoras = async () => {
        try {
            const { data } = await axiosInstance.get('/productoras');
            setProductoras(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        listarProductoras();
    }, []);

    const guardarProductora = async (e) => {
        e.preventDefault();
        try {
            const payload = { nombre, estado, slogan, descripcion };
            if (idEdit) {
                await axiosInstance.put(`/productoras/${idEdit}`, payload);
                setIdEdit(null);
            } else {
                await axiosInstance.post('/productoras', payload);
            }
            setNombre('');
            setSlogan('');
            setDescripcion('');
            setEstado('Activo');
            listarProductoras();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (prod) => {
        setIdEdit(prod._id);
        setNombre(prod.nombre);
        setEstado(prod.estado);
        setSlogan(prod.slogan || '');
        setDescripcion(prod.descripcion || '');
    };

    const eliminarProductora = async (id) => {
        if (window.confirm('¿Desea eliminar esta productora?')) {
            try {
                await axiosInstance.delete(`/productoras/${id}`);
                listarProductoras();
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
                        <div className={`card-header text-white ${idEdit ? 'bg-warning text-dark' : 'bg-dark'}`}>
                            <h5 className="mb-0">{idEdit ? 'Editar Productora' : 'Nueva Productora'}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={guardarProductora}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Slogan</label>
                                    <input type="text" className="form-control" value={slogan} onChange={(e) => setSlogan(e.target.value)} />
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
                                    <textarea className="form-control" rows="2" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className={`btn w-100 ${idEdit ? 'btn-warning text-dark' : 'btn-dark'}`}>
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
                                <th>Slogan</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productoras.map((prod) => (
                                <tr key={prod._id}>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.slogan}</td>
                                    <td>{prod.estado}</td>
                                    <td className="d-flex gap-2">
                                        <button className="btn btn-sm btn-outline-info" onClick={() => handleEdit(prod)}>✎</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarProductora(prod._id)}>🗑</button>
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

export default ProductoraView;
