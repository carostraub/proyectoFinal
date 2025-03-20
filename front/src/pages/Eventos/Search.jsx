import React, { useEffect, useState } from "react";
import { baseURL } from "../../config";
import { useAuth } from "../../../src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Search = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]); // Eventos originales
  const [eventosFiltrados, setEventosFiltrados] = useState([]); // Eventos filtrados

  useEffect(() => {
    obtenerEventos();
  }, []);

  const obtenerEventos = async () => {
    try {
      let token = localStorage.getItem("access_token"); // Obtiene el token del almacenamiento local
      if (!token) {
        throw new Error("No hay token de autenticación disponible.");
      }
  
      const response = await fetch(`${baseURL}/api/evento/categoria/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Incluye el token en el header
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en la respuesta del servidor: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Eventos recibidos:", data);
      setEventos(data); // Guardar eventos originales
      setEventosFiltrados(filtrarEventos(data)); // Aplicar filtro
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  

  const filtrarEventos = (eventosLista) => {
    if (!user) return []; // Si no hay usuario, no mostramos eventos

    return eventosLista.filter((event) => {
        console.log("Verificando evento:", event.nombre_evento);
        console.log("Datos del evento:", event);

        // Validación de edad
        if (event.edad_min && user.edad < event.edad_min) {
            console.log(`Evento descartado por edad mínima: ${event.nombre_evento}`);
            return false;
        }
        if (event.edad_max && user.edad > event.edad_max) {
            console.log(`Evento descartado por edad máxima: ${event.nombre_evento}`);
            return false;
        }

        // Validación de género
        console.log("Validación de género");
        console.log("Género permitido en el evento:", event.genero_permitido, "Tipo:", typeof event.genero_permitido);
        console.log("Género del usuario:", user.genero);

        let generosPermitidos = event.genero_permitido.split(',').map(g => g.trim().replace(/"/g, ""));
        console.log("Array de géneros permitidos:", generosPermitidos);

        if (!generosPermitidos.includes("No importa") && !generosPermitidos.includes(user.genero)) {
            console.log(`Evento descartado por género: ${event.nombre_evento}`);
            return false;
        }

        // Validación de sexo
        console.log("Validación de sexo");
        console.log("Sexo permitido en el evento:", event.sexo_permitido);
        console.log("Sexo del usuario:", user.sexo);

        // Interpretación de "Mixto" en front-end
        if (event.sexo_permitido !== "No importa" && event.sexo_permitido !== "Mixto" && event.sexo_permitido !== user.sexo) {
            console.log(`Evento descartado por sexo: ${event.nombre_evento}`);
            return false;
        }

        console.log(` Evento permitido: ${event.nombre_evento}`);
        return true;
    });
};





  const handlePostular = async (eventoId) => {
    try {
      let token = localStorage.getItem("access_token");

      const response = await fetch(`${baseURL}/api/gestionar_postulacion/${eventoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  console.log(response)
  console.log(eventoId)
      const data = await response.json();

      if (response.ok) {
        alert("Postulación exitosa!");
      } else {
        alert("Error al postular: " + data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="container mt-2">
      {eventosFiltrados.length > 0 ? (
        eventosFiltrados.map((event, index) => (
          <div className="card mb-5 border" key={index}>
            <div className="card-header">{event.nombre_evento}</div>
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <h5 className="card-title">Ubicación: {event.ubicacion}</h5>
                  <p className="card-text">Fecha: {event.fecha}</p>
                  <p className="card-text">Hora: {event.hora}</p>
                  <p className="card-text">Descripción: {event.description}</p>
                  <p className="card-text">Requiere pago: {event.dinero}</p>
                </div>
                <div className="col-3 text-end">
                  <h5
                    className="card-title text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/perfil/${event.organizador.id}`)}
                  >
                    Organizador: {event.organizador.nombre}
                  </h5>
                  <button
                    className="btn btn-custom"
                    onClick={() => handlePostular(event.id)}
                  >
                    Postular
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted">No hay eventos disponibles.</p>
      )}
    </div>
  );
};

export default Search;
