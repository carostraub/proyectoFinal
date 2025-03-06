import React from "react";

const Search = () => {
  return (
    <div className="container mt-2">
      <div class="card">
        <div class="card-header">Futbol</div>
        <div class="card-body">
          <div className="row">
            <div className="col-9">
              <h5 class="card-title">Ubicacion</h5>
              <p class="card-text">Fecha y Hora</p>
              <p class="card-text">Descripcion</p>
              <p class="card-text">Requiere pago</p>
            </div>
            <div className="col-3">
              <h5 class="card-title">Nombre Organizador</h5>
              <a href="#" class="btn btn-outline-secondary">
                Formar parte
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
