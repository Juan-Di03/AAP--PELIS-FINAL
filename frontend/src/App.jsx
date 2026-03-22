import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import GeneroView from './features/GeneroView';
import DirectorView from './features/DirectorView';
import ProductoraView from './features/ProductoraView';
import TipoView from './features/TipoView';
import MediaView from './features/MediaView';

const App = () => {
    return (
        <Router>
            <Header />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<MediaView />} />
                    <Route path="/generos" element={<GeneroView />} />
                    <Route path="/directores" element={<DirectorView />} />
                    <Route path="/productoras" element={<ProductoraView />} />
                    <Route path="/tipos" element={<TipoView />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
