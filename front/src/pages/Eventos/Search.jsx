

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

import React, { useEffect, useState } from "react";
import { baseURL } from "../../config";
import { useAuth } from "../../../src/context/AuthContext";

const Search = () => {
  const { user } = useAuth();
  const [eventos, setEventos] = useState([

    {
      organizador: "julio",
      nombre_evento: "futbol 5",
      ubicacion: "lagomar",
      fecha_hora: "18:30 14/03/2025",
      dinero: "$150",
      participantes: "10",
      descripcion: "futbol tranqui entre amigos",

    },
    {
      organizador: "julio",
      nombre_evento: "futbol 5",
      ubicacion: "lagomar",
      fecha_hora: "18:30 14/03/2025",
      dinero: "$150",
      participantes: "10",
      descripcion: "futbol tranqui entre amigos",

    }

  ])

  const obtenerEventos = async () => {
    try {
      const response = await fetch(`${baseURL}/events`)
      const data = await response.json()
      console.log(data)
      setEventos(data)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    // obtenerEventos()
  }, [])

  return (
    <div className="container mt-2">
      {eventos.map((item, index) => (
        <div className="card mb-5" key={index}>
          <div className="card-header">{item.nombre_evento}</div>
          <div className="card-body">
            <div className="row">
              <div className="col-9">
                <h5 className="card-title">Ubicacion: {item.ubicacion}</h5>
                <p className="card-text">Fecha y Hora: {item.fecha_hora}</p>
                <p className="card-text">Descripcion: {item.descripcion}</p>
                <p className="card-text">Requiere pago: {item.dinero}</p>
              </div>
              <div className="col-3">
                <h5 className="card-title">Organizador: {item.organizador}</h5>
                <a href="#" className="btn btn-outline-secondary">
                  Formar parte
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Search;
