import React, { useState } from "react";
import { useAuth } from "../../../src/context/AuthContext";
import AgeRange from "../../components/AgeRange";

const CreateOther = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    category: 4, // le agregue la categoria
    nameEvent: "",
    location: "",
    time: "",
    date: "",
    missingPeople: 0,
    payment: "no",
    description: "",
    sex: "",
    gender: [],
    ageRange: {
      edadMin: 16,
      edadMax: 50
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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

  const handleAgeRangeChange = ({ edadMin, edadMax }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ageRange: { edadMin, edadMax } 
    }));
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

  const isFormComplete = () => {
    const { nameEvent, location, time, date, missingPeople, description, sex, gender, ageRange } = formData;

    if (!nameEvent || !location || !time || !date || !description || !sex) {
      return false;
    }

    if (missingPeople <= 0) {
      return false;
    }

    if (!gender.length) {
      return false;
    }

    if (ageRange.edadMin <= 0 || ageRange.edadMax <= 0 || ageRange.edadMin > ageRange.edadMax) {
      return false;
    }

    return true;
  };

  return (
    <div className="container text-center">
      <h1>Crea tu evento personalizado</h1>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="nameEvent" className="form-label">
              Nombre de Evento
            </label>
            <input
              type="text"
              className="form-control"
              name="nameEvent"
              value={formData.nameEvent}
              onChange={handleChange}
            />
            <label htmlFor="location" className="form-label">
              Ubicación
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <div className="row">
              <div className="col">
                <label htmlFor="date" className="form-label">
                  Fecha
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label htmlFor="time" className="form-label">
                  Horario
                </label>
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="missingPeople" className="form-label">
                  ¿Cuántas personas faltan?
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="missingPeople"
                  value={formData.missingPeople}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <div>¿Se requiere de pago?</div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="si"
                    checked={formData.payment === "si"}
                    onChange={handleChange}
                    name="payment"
                  />
                  <label className="form-check-label">Sí</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="no"
                    checked={formData.payment === "no"}
                    onChange={handleChange}
                    name="payment"
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <h3 className="text-center mt-4">Rango de edad</h3>
          <AgeRange onChange={handleAgeRangeChange} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-floating">
            <textarea
              className="form-control"
              style={{ height: "100px" }}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <label>Descripción del evento...</label>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <button className="btn btn-custom w-50" onClick={handleSubmit}>
          Crear Evento
        </button>
      </div>
    </div>
  );
};

export default CreateOther;
