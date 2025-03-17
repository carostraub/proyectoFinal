import React from 'react'
import { Link } from "react-router-dom";

const cardStyle = {
    width: "29rem",
    height: "auto",
    margin: "auto"
};

function CardsCategories({ id, categoria, titulo, description1, description2, url }) {
    return (
        <div>
            <div className="card text-bg-light mb-3 border" style={cardStyle}>
                <div className="card-header text-center">
                    <h3 className='text-decoration-underline'>{categoria}</h3>
                </div>
                <div className="card-body">
                    <h5 className="card-title ">{titulo}</h5>
                    <p className="card-text text-center">{description1}</p>
                    <p className="card-text"> {description2}</p>
                    <div className="mt-5">
                        <Link to={"/search/" + id}>
                            <button className="btn btn-custom w-75 mb-1">
                                Buscar evento
                            </button>
                        </Link>
                        <Link to={url}>
                            <button className="btn btn-custom w-75">
                                Crear evento
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardsCategories