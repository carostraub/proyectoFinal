import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { baseURL } from "../../config/";

const MyEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${baseURL}/api/myevents`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setEvents(data);
        } else {
          console.error("Error al obtener eventos:", data.error);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchEvents();
  }, [user]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handlePostulantAction = async (eventId, userId, action) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${baseURL}/api/gestionar_postulacion/${eventId}/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estatus: action }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(`Usuario ${action.toLowerCase()} con éxito`);
        setSelectedEvent((prevEvent) => ({
          ...prevEvent,
          participantes: prevEvent.participantes.filter((p) => p.id !== userId),
        }));
      } else {
        console.error("Error al gestionar postulante:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este evento?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${baseURL}/api/evento/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Evento eliminado con éxito");
        setEvents(events.filter((event) => event.id !== eventId));
        setSelectedEvent(null);
      } else {
        console.error("Error al eliminar evento:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Mis Eventos</h2>
      <div className="row">
        <div className="col-md-4">
          <h4>Lista de Eventos</h4>
          <ul className="list-group">
            {events.map((event) => (
              <li
                key={event.id}
                className={`list-group-item ${
                  selectedEvent?.id === event.id ? "active" : ""
                }`}
                onClick={() => handleSelectEvent(event)}
                style={{ cursor: "pointer" }}
              >
                {event.nombre_evento}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          {selectedEvent && (
            <div className="card p-4 shadow">
              <h3>{selectedEvent.nombre_evento}</h3>
              <h5 className="text-muted">{selectedEvent.category}</h5>

              <div className="row">
                {/* Filtros */}
                <div className="col-md-6">
                  <h6>Filtros seleccionados:</h6>
                  <p>
                    <strong>Género:</strong> {selectedEvent.genero_permitido}
                  </p>
                  <p>
                    <strong>Sexo:</strong> {selectedEvent.sexo_permitido}
                  </p>
                  <p>
                    <strong>Rango de edad:</strong> {selectedEvent.edad_min} -{" "}
                    {selectedEvent.edad_max}
                  </p>
                </div>

                {/* Ubicación, Fecha y Hora */}
                <div className="col-md-6 text-end">
                  <h6>Ubicación:</h6>
                  <p>{selectedEvent.ubicacion}</p>
                  <h6>Fecha:</h6>
                  <p>{selectedEvent.fecha}</p>
                  <h6>Hora:</h6>
                  <p>{selectedEvent.hora}</p>
                </div>
              </div>

              {/* Lista de Postulantes */}
              <h4 className="mt-4">Postulantes</h4>
              <div className="row">
                {selectedEvent.participantes.length > 0 ? (
                  selectedEvent.participantes.map((postulant) => (
                    <div key={postulant.id} className="col-md-4">
                      <div className="card text-center p-3 mb-3">
                        <h5>{postulant.nombre}</h5>
                        <p>Edad: {postulant.edad}</p>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handlePostulantAction(
                              selectedEvent.id,
                              postulant.id,
                              "PARTICIPANTE"
                            )
                          }
                        >
                          Aceptar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handlePostulantAction(
                              selectedEvent.id,
                              postulant.id,
                              "RECHAZADO"
                            )
                          }
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No hay postulantes aún.</p>
                )}
              </div>

              {/* Botón para eliminar evento */}
              <div className="text-center mt-4">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                >
                  Eliminar Evento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
