import React, { useState } from "react";
import { useAuth } from "../../../src/context/AuthContext";
import AgeRange from "../../components/AgeRange";


const CreateEvent = () => {
  const { user } = useAuth();
  

  const [formData, setFormData] = useState({
    category: 2, // Agregue la categoría porque el backend lo estará esperando
    eventType: "",
    nameEvent: "",
    location: "",
    time: "",
    date: "",
    missingPeople: 0,
    payment: "no",
    description: "",
    sex: "",
    gender: [],
    edadMin: 16,
    edadMax: 50
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      if (checked) {
        return { ...prevFormData, gender: [...prevFormData.gender, value] };
      } else {
        return { ...prevFormData, gender: prevFormData.gender.filter((g) => g !== value) };
      }
    });
  };

  const handleAgeRangeChange = ({ edadMin, edadMax }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      edadMax:edadMax,
      edadMin:edadMin 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormComplete()) {
      alert("Por favor, completa todos los campos antes de continuar.");
      return;
    } else {
      console.log("Formulario enviado con éxito:", formData);
    
      try {
        let token = localStorage.getItem("access_token");
        const response = await fetch("http://localhost:5000/api/evento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
          alert("Evento creado con éxito!");
        } else {
          alert("Error al crear el evento: " + data.error);
        }
      } catch (error) {
        console.log("Error en la solicitud:", error);
      }
    }
  };

  const isFormComplete = () => {
    const { nameEvent, location, time, date, missingPeople, description, sex, gender, edadMax,edadMin } = formData;

    if (!nameEvent || !location || !time || !date || !description || !sex) return false;
    if (missingPeople <= 0) return false;
    if (!gender.length) return false;
    if (edadMin <= 0 || edadMax <= 0 || edadMin > edadMax) return false;

    return true;
  };

  return (
    <div className="container text-center">
      <h1>Evento</h1>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label className="form-label">Tipo de Evento</label>
            <input type="text" className="form-control" name="eventType" value={formData.eventType} onChange={handleChange} />
            
            <label className="form-label">Nombre de Evento</label>
            <input type="text" className="form-control" name="nameEvent" value={formData.nameEvent} onChange={handleChange} />
            
            <label className="form-label">Ubicación</label>
            <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} />
            
            <div className="row">
              <div className="col">
                <label className="form-label">Fecha</label>
                <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="form-label">Horario</label>
                <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} />
              </div>
            </div>

            {/* Personas faltantes y Pago en la misma línea */}
            <div className="row mt-3">
              <div className="col">
                <label className="form-label">¿Cuántas personas faltan?</label>
                <div className="d-flex justify-content-center">

                <input type="number" 
                className="form-control" 
                name="missingPeople" 
                value={formData.missingPeople} 
                onChange={handleChange} 
                style={{ width: "5rem" }} />
                </div>
              </div>

              <div className="col">
                <div className="form-label">¿Se requiere de pago?</div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" 
                  type="radio" 
                  name="payment" 
                  value="si" 
                  checked={formData.payment === "si"} 
                  onChange={handleChange} />
                  <label className="form-check-label">Sí</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="payment" value="no" checked={formData.payment === "no"} onChange={handleChange} />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="col">
        <h1 className="text-center">Filtros</h1>
          <h5 className="mt-4 text-center">Sexo</h5>
          <div className="d-flex justify-content-center">
            {["Masculino", "Femenino", "Mixto"].map((sex) => (
              <div key={sex} className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="sex" value={sex} onChange={handleChange} />
                <label className="form-check-label">{sex}</label>
              </div>
            ))}
          </div>

          <h5 className="mt-3 text-center">Género</h5>
          <div className="d-flex justify-content-center">
            {["Hombre", "Mujer", "No Binario", "Otro"].map((gen) => (
              <div key={gen} className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" value={gen} checked={formData.gender.includes(gen)} onChange={handleCheckboxChange} />
                <label className="form-check-label">{gen}</label>
              </div>
            ))}
          </div>

          <h5 className="mt-3 text-center">Rango de edad</h5>
          <AgeRange onChange={handleAgeRangeChange} />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <label className="form-label">Descripción del evento</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} style={{ height: "100px" }} />
        </div>
      </div>

      <button className="btn btn-custom w-50 mt-4" onClick={handleSubmit}>Crear Evento</button>
    </div>
  );
};

export default CreateEvent;
