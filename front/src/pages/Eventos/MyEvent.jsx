import React from "react";

const MyEvent = () => {
  return (
    <div class="card text-center">
      <div class="card-header">Mi evento</div>
      <div class="card-body">
        <h5 class="card-title">Partido Fútbol 6 x lado</h5>
        <p class="card-text">
          <p>Detalles de tu evento de deporte:</p>
          <p>Personas: 12</p>
          <p>Cuota: 2500 clp</p>
          <p>Lugar: Rancho Rossi, La Serena</p>
          <p>Fecha: 12 de abril - Hora: 19:30</p>
        </p>
        <a class="btn btn-custom">Eliminar evento</a>
      </div>
      <div class="card-footer text-body-secondary">Creado hace 2 días</div>
    </div>
  );
};

export default MyEvent;
