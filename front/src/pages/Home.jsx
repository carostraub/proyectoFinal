import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const cardStyle = {
    width: "26rem",
    height: "19rem"
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna 1 */}
        <div className="col-md-6 col-6 text-center">
          <div className="card text-bg-light mb-3 " style={cardStyle}>
            <div className="card-header text-center">Deportes</div>
            <div className="card-body">
              <h5 className="card-title ">Crea tu evento deportivo!</h5>
              <p className="card-texttext-center">
                Buscas rival o compañeros de equipo?
              </p>
              <p className="card-text">
                Pues aqui tienes tu solucion!
              </p>
              <div className="mt-5">
                <div>
                <Link to="/search">
                  <button className="btn btn-outline-secondary w-75">
                    Buscar evento
                  </button>
                  </Link>
                </div>
                <Link to="/createsport">
                  <button className="btn btn-outline-secondary w-75">
                    Crear evento
                  </button>
                </Link>
              </div>




            </div>
          </div>
        </div>
        <div className="col-md-6 col-6 ">
          <div className="card text-bg-light mb-3 text-center" style={cardStyle}>
            <div className="card-header text-center">Seguridad</div>
            <div className="card-body">
              <h5 className="card-title">Busca tu compañero aqui!</h5>
              <p className="card-text">
                Te espera un camino peligroso o no deseado?
              </p>
              <p className="card-text">
                Pues aqui puedes buscar un acompañante para tu viaje!
              </p>
              <div className="p-3">
                <div>
                  <button className="btn btn-outline-secondary w-75">
                    Buscar evento
                  </button>
                </div>
                <Link to="/createsecurity">
                  <button className="btn btn-outline-secondary w-75">
                    Crear evento
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card text-bg-light mb-3 text-center" style={cardStyle}>
            <div className="card-header text-center">Eventos</div>
            <div className="card-body">
              <h5 className="card-title">Crea tu evento aqui!</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
              <div className="mt-5">
                <div>
                  <button className="btn btn-outline-secondary w-75">
                    Buscar evento
                  </button>
                </div>
                <Link to="/createevent">
                  <button className="btn btn-outline-secondary w-75">
                    Crear evento
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="col-md-6">


          <div className="card text-bg-light mb-3 text-center" style={cardStyle}>
            <div className="card-header text-center">Otros</div>
            <div className="card-body">
              <h5 className="card-title">Crea tu evento personalizado!</h5>
              <p className="card-text">
                Estas aburrido y buscas una o mas personas para llevar a cabo una actividad?
              </p>
              <p className="card-text">
                Pues crea tu propio evento aqui!
              </p>
              <div className="p-3">
                <div>
                  <button className="btn btn-outline-secondary w-75">
                    Buscar evento
                  </button>
                </div>
                <Link to="/createother">
                  <button className="btn btn-outline-secondary w-75">
                    Crear evento
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
