import React, { useState } from "react";
import { useAuth } from "../../../src/context/AuthContext";
import AgeRange from "../../components/AgeRange";

const CreateSecurity = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    category: 3, // Agregue la categoria porque el backend lo estará esperando
    nameEvent: "",
    locationFrom: "",
    locationTo: "",
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

  //  Mantener `ageRange` como un objeto en vez de un array para que backend lo lea correctamente
  const handleAgeRangeChange = ({ edadMin, edadMax }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ageRange: { edadMin, edadMax } // Ahora es un objeto correctamente
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
    const { nameEvent, locationFrom, locationTo, time, date, missingPeople, description, sex, gender, ageRange } = formData;

    if (!nameEvent || !locationFrom || !locationTo || !time || !date || !description || !sex) {
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
      <h1>Seguridad</h1>
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
            <label htmlFor="locationFrom" className="form-label">
              Ubicación Salida
            </label>
            <input
              type="text"
              className="form-control"
              name="locationFrom"
              value={formData.locationFrom}
              onChange={handleChange}
            />
            <label htmlFor="locationTo" className="form-label">
              Ubicación Llegada
            </label>
            <input
              type="text"
              className="form-control"
              name="locationTo"
              value={formData.locationTo}
              onChange={handleChange}
            />
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

export default CreateSecurity;
