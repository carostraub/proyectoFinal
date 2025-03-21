import React from "react";
import { Link } from "react-router-dom";

function CardsCategories({ categories }) {
  return (
    <div className="container">
      <div className="row">
        {categories.map((category) => (
          <div className="col-12 col-md-6 col-lg-6 g-2" key={category.id}>
            <div className="card text-bg-light d-flex flex-column h-100">
              <div className="card-header text-center">
                <h3 className="text-decoration-underline">
                  {category.categoria}
                </h3>
              </div>
              <div className="card-body flex-grow-1">
                <h5 className="card-title">{category.titulo}</h5>
                <p className="card-text">{category.description1}</p>
                <p className="card-text">{category.description2}</p>
              </div>
              <div className="mt-auto text-center pb-2">
                <Link to={`/search/${category.id}`}>
                  <button className="btn btn-custom w-75 mb-1">
                    Buscar Evento
                  </button>
                </Link>
                <Link to={category.url}>
                  <button className="btn btn-custom w-75">Crear evento</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsCategories;
