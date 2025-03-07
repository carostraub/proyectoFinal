

// organizador= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
//     nombre_evento = db.Column(db.String, nullable=False)
//     ubicacion = db.Column(db.String, nullable=False)
//     fecha_hora = db.Column(db.String, nullable=False)
//     dinero = db.Column(db.String)
    
//     participantes = relationship('User', secondary=participantes_table, back_populates="eventos_postulados")

//  const handleSubmit = async (e) => {
//         e.preventDefault();

//         //  FormData para enviar la imagen y los demás datos
//         const dataToSend = new FormData();
//         for (const key in formData) {
//             dataToSend.append(key, formData[key]);
//         }

//         try {
//             const response = await fetch(`${baseURL}/register`, {
//                 method: "POST",
//                 body: dataToSend
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 alert("Registro exitoso 🎉");
//                 console.log("Usuario registrado:", result);
//             } else {
//                 alert("Error en el registro: " + result.error);
//             }
//         } catch (error) {
//             console.error("Error en la petición:", error);
//             alert("Hubo un problema con el registro.");
//         }
//     };

import React, { useState } from "react";
import { baseURL } from "../../config";

const Search = () => {
const [eventos,setEventos] = useState ([])

  const obtenerEventos = async()=>{
    try {
      const response= await fetch(`${baseURL}/events`)
      const data = await response.json()
    } catch (error) {
      console.log(error)
    }

  }

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
