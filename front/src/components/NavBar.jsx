import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const NavBar = () => {
  const { user, logout } = useAuth(); 
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
          <img 
            src="/LogoCrewUp.png"  
            alt="CrewUp Logo" 
            style={{ height: "40px", width: "auto" }} 
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/*  Si el usuario está autenticado, mostrar estas opciones */}
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/createevent">Crear evento</Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Opciones
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/profile">Perfil</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">Configuración</Link>
                    </li>
                    <li>
                      <button className="dropdown-item btn btn-danger btn-sm my-1" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              //  Si el usuario NO está autenticado, mostrar estas opciones
              <>
                {location.pathname !== "/login" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                  </li>
                )}
                {location.pathname !== "/register" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Registrarse</Link>
                  </li>
                )}
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
