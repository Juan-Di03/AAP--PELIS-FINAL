import { NavLink } from 'react-router-dom';

const NavBar = ({ closeNav }) => {
    const links = [
        { to: "/", label: "Películas" },
        { to: "/generos", label: "Géneros" },
        { to: "/directores", label: "Directores" },
        { to: "/productoras", label: "Productoras" },
        { to: "/tipos", label: "Tipos" },
    ];

    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link) => (
                <li className="nav-item" key={link.to}>
                    <NavLink 
                        className="nav-link" 
                        to={link.to} 
                        onClick={closeNav}
                    >
                        {link.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default NavBar;