import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar'; // Importamos el componente de arriba
import logo from '../assets/logo.png';

const Header = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const toggleNav = () => setIsNavCollapsed(!isNavCollapsed);
    const closeNav = () => setIsNavCollapsed(true);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand d-flex align-items-center" to="/" onClick={closeNav}>
                    <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
                    IU Digital Cinema
                </NavLink>

                <button className="navbar-toggler" type="button" onClick={toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
                    {/* Llamamos al NavBar y le pasamos la función para cerrarse */}
                    <NavBar closeNav={closeNav} />
                </div>
            </div>
        </nav>
    );
};

export default Header;
