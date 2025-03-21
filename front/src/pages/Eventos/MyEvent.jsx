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
        console.log("Eventos recibidos:", data); // Verificar qué se recibe del backend
        if (response.ok && Array.isArray(data)) {
          setEvents(data);  // Asegúrate de que data sea un array antes de guardarlo
          console.log("Eventos guardados en el estado:", data); // Verificar el estado de eventos
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
        setSelectedEvent((prevEvent) => {
          const updatedParticipantes = prevEvent.participantes.filter((p) => p.id !== userId);
          const updatedParticipantesList =
            action === "PARTICIPANTE"
              ? [...(prevEvent.participantesList || []), prevEvent.participantes.find((p) => p.id === userId)]
              : prevEvent.participantesList || [];

          return {
            ...prevEvent,
            participantes: updatedParticipantes,
            participantesList: updatedParticipantesList,
          };
        });
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
            {events.length > 0 ? (
              events.map((event) => (
                <li
                  key={event.id}
                  className={`list-group-item ${selectedEvent?.id === event.id ? "selected" : ""}`}
                  onClick={() => handleSelectEvent(event)}
                  style={{ cursor: "pointer" }}
                >
                  {event.nombre_evento}
                </li>
              ))
            ) : (
              <li className="list-group-item">No hay eventos disponibles.</li>
            )}
          </ul>
        </div>
        <div className="col-md-8">
          {selectedEvent && (
            <div className="card border p-4">
              <button
                className="btn-close position-absolute top-0 end-0 m-2"
                onClick={() => setSelectedEvent(null)}
              />
              <h3>{selectedEvent.nombre_evento}</h3>
              <p>{selectedEvent.description}</p>
              <p>Fecha: {selectedEvent.fecha}</p>
              <p>Hora: {selectedEvent.hora}</p>
              <p>Ubicación: {selectedEvent.ubicacion}</p>
              <p>Pago: {selectedEvent.dinero}</p>
              <p>Categoría: {selectedEvent.category}</p>
              <p>Rango de Edad: {selectedEvent.edad_min} - {selectedEvent.edad_max}</p>
              <p>Sexo Permitido: {selectedEvent.sexo_permitido}</p>
              <p>Género Permitido: {selectedEvent.genero_permitido}</p>

              <h4 className="mt-4">Postulantes</h4>
              {selectedEvent.participantes && selectedEvent.participantes.length > 0 ? (
                selectedEvent.participantes.map((postulant) => (
                  <div key={postulant.id} className="card text-center p-3 mb-3">
                    <h5>{postulant.nombre}</h5>
                    <p>Edad: {postulant.edad}</p>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-custom w-50"
                        onClick={() =>
                          handlePostulantAction(selectedEvent.id, postulant.id, "PARTICIPANTE")
                        }
                      >
                        Aceptar
                      </button>
                      <button
                        className="btn btn-borrar w-50"
                        onClick={() =>
                          handlePostulantAction(selectedEvent.id, postulant.id, "RECHAZADO")
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

              <h4 className="mt-4">Participantes</h4>
              {selectedEvent.participantesList && selectedEvent.participantesList.length > 0 ? (
                selectedEvent.participantesList.map((participante) => (
                  <div key={participante.id} className="card text-center p-3 mb-3">
                    <h5>{participante.nombre}</h5>
                  </div>
                ))
              ) : (
                <p className="text-muted">No hay participantes aún.</p>
              )}



              <div className="text-center mt-4">
                <button
                  className="btn btn-borrar w-25"
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
