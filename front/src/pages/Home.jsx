import React, { useState } from "react";
import CardsCategories from "../components/CardsCategories.jsx";

const Home = () => {
  const categories = [
    {
      id: 1,
      categoria: "Deportes",
      titulo: "¡Crea tu evento deportivo!",
      description1: "¿Buscas rival o compañeros de equipo?",
      description2: "¡Pues aquí tienes tu solución!",
      url: "/createsport",
    },
    {
      id: 2,
      categoria: "Seguridad",
      titulo: "¡Busca tu compañero aquí!",
      description1: "¿Te espera un camino peligroso o no deseado?",
      description2: "¡Aquí puedes buscar un acompañante para tu viaje!",
      url: "/createsecurity",
    },
    {
      id: 3,
      categoria: "Eventos",
      titulo: "¡Crea tu evento aquí!",
      description1: "¿Buscas un acompañante para un concierto o evento?",
      description2: "¡Aquí puedes encontrar tu acompañante ideal!",
      url: "/createevent",
    },
    {
      id: 4,
      categoria: "Otros",
      titulo: "¡Crea tu evento personalizado!",
      description1:
        "¿Estás aburrido y buscas una o más personas para llevar a cabo una actividad?",
      description2: "¡Pues crea tu propio evento aquí!",
      url: "/createother",
    },
  ];

  const [listCategories, setLisCategories] = useState(categories);

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex">
          <CardsCategories categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Home;
