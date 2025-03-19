import React, { useState } from "react";
import { useAuth } from "../../../src/context/AuthContext";
import AgeRange from "../../components/AgeRange";
import { baseURL } from "../../config";

const CreateOther = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    category: 4, // ID de la categoría "Otros Eventos"
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
      ageRange: { edadMin, edadMax }
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
        const response = await fetch(`${baseURL}/api/evento`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert("Evento creado con éxito! 🎉");
        } else {
          alert("Error al crear evento");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const isFormComplete = () => {
    const { nameEvent, location, time, date, missingPeople, description, sex, gender, ageRange } = formData;

    if (!nameEvent || !location || !time || !date || !description || !sex) return false;
    if (missingPeople <= 0) return false;
    if (!gender.length) return false;
    if (ageRange.edadMin <= 0 || ageRange.edadMax <= 0 || ageRange.edadMin > ageRange.edadMax) return false;

    return true;
  };

  return (
    <div className="container text-center">
      <h1>Crea tu evento personalizado</h1>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="nameEvent" className="form-label">Nombre de Evento</label>
            <input
              type="text"
              className="form-control"
              name="nameEvent"
              value={formData.nameEvent}
              onChange={handleChange}
            />

            <label htmlFor="location" className="form-label">Ubicación</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <div className="row">
              <div className="col">
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label className="form-label">Horario</label>
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Pago y personas faltantes alineados */}
            <div className="row mt-3">
              <div className="col">
                <label className="form-label">¿Cuántas personas faltan?</label>
                <input
                  type="number"
                  className="form-control"
                  name="missingPeople"
                  value={formData.missingPeople}
                  onChange={handleChange}
                  style={{ width: "5rem", display: "inline-block" }}
                />
              </div>

              <div className="col">
                <label className="form-label">¿Se requiere de pago?</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    value="si"
                    checked={formData.payment === "si"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Sí</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    value="no"
                    checked={formData.payment === "no"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="col">
          <h3 className="text-center mt-4">Filtros</h3>

          {/* Sexo */}
          <h5 className="mt-3">Sexo</h5>
          <div className="d-flex justify-content-center">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="sex" value="Masculino" onChange={handleChange} />
              <label className="form-check-label">Masculino</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="sex" value="Femenino" onChange={handleChange} />
              <label className="form-check-label">Femenino</label>
            </div>
          </div>

          {/* Género */}
          <h5 className="mt-3">Género</h5>
          <div className="d-flex justify-content-center">
            {["Hombre", "Mujer", "No Binario", "Otro"].map((gen) => (
              <div key={gen} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={gen}
                  checked={formData.gender.includes(gen)}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label">{gen}</label>
              </div>
            ))}
          </div>

          {/* Rango de edad */}
          <h5 className="mt-3">Rango de edad</h5>
          <AgeRange onChange={handleAgeRangeChange} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-floating">
            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}
              name="description"
              value={formData.description}
              onChange={handleChange}
            >

            </textarea>
            <label htmlFor="floatingTextarea2">Descripcion del evento...</label>
          </div>
        </div>
      </div>

      <button className="btn btn-custom w-50 mt-4" onClick={handleSubmit}>Crear Evento</button>
    </div>
  );
};

export default CreateOther;
