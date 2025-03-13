import React, { useState } from "react";
import { useAuth } from "../../../src/context/AuthContext";
import AgeRange from "../../components/AgeRange";
import { baseURL } from "../../config/index";

const CreateSport = () => {
  const { user } = useAuth();

  const sports = [
    "Ajedrez",
    "Atletismo",
    "Bádminton",
    "Baloncesto",
    "Balonmano",
    "Béisbol",
    "Billar",
    "Boxeo",
    "Ciclismo",
    "Esgrima",
    "Fútbol",
    "Gimnasia",
    "Golf",
    "Halterofilia",
    "Judo",
    "Karate",
    "Natación",
    "Rugby",
    "Taekwondo",
    "Tenis",
    "Tenis de mesa",
    "Tiro con arco",
    "Voleibol"
  ];

  const [formData, setFormData] = useState({
    nameSport: "",
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
        // guardar formulario 
        let token = localStorage.getItem("access_token")
        const response = await fetch(`${baseURL}/evento`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert("Evento creado de forma exitosa! 🎉");

        } else {
          alert("Error al crear evento: " + result.error);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleAgeRangeChange = ({ edadMin, edadMax }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ageRange: [{ edadMin, edadMax }]
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prevFormData) => {
      if (checked) {
        // Agregar el valor si está marcado
        return { ...prevFormData, gender: [...prevFormData.gender, value] };
      } else {
        // Remover el valor si está desmarcado
        return { ...prevFormData, gender: prevFormData.gender.filter((g) => g !== value) };
      }
    });
  };

  const isFormComplete = () => {
    const { nameSport, nameEvent, location, time, date, missingPeople, payment, description, sex, gender, ageRange } = formData;

    // Verificar que los campos de texto no estén vacíos
    if (!nameSport || !nameEvent || !location || !time || !date || !description || !sex) {
      return false;
    }

    // Verificar que missingPeople sea mayor que 0
    if (missingPeople <= 0) {
      return false;
    }

    // Verificar que gender no esté vacío (debe haber al menos un género seleccionado)
    if (!gender.length) {
      return false;
    }

    // Verificar que el rango de edad sea válido
    if (ageRange.edadMin <= 16 || ageRange.edadMax <= 0 || ageRange.edadMin > ageRange.edadMax) {
      return false;
    }

    return true; // Todos los campos están completos y válidos
  };

  return (
    <div className="container text-center">
      <h1>Deporte</h1>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="deporte" className="form-label">
              Deporte
            </label>
            <div className="form-floating text-center">
              <select
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                name="nameSport"
                onChange={handleChange}
              >
                <option selected>...</option>
                {sports.map((sport, index) => (
                  <option key={index} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>

            </div>
            <label htmlFor="deporte" className="form-label">
              Nombre de Evento
            </label>
            <input
              type="text"
              className="form-control"
              id="deporte"
              placeholder="...."
              name="nameEvent"
              value={formData.nameEvent}
              onChange={handleChange}
            />
            <label htmlFor="ubicacion" className="form-label">
              Ubicación
            </label>
            <input
              type="text"
              className="form-control"
              id="ubicacion"
              placeholder="...."
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <div className="row">
              <div className="col">
                <label htmlFor="deporte" className="form-label">
                  Fecha
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="deporte"
                  placeholder="...."
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label htmlFor="deporte" className="form-label">
                  Horario
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="deporte"
                  placeholder="...."
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="personasFaltan" className="form-label">
                  ¿Cuántas personas faltan?
                </label>
                <div className="d-flex justify-content-center">
                  <input
                    type="number"
                    className="form-control"
                    id="personasFaltan"
                    placeholder="...."
                    style={{ width: "5rem" }}
                    name="missingPeople"
                    value={formData.missingPeople}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col">
                <div>¿Se requiere de pago?</div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="PagoCheckbox1"
                    value="si"
                    checked={FormData.payment === "si"}
                    onChange={handleChange}
                    name="payment"

                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    Sí
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="PagoCheckbox2"
                    value="no"
                    checked={FormData.payment === "no"}
                    onChange={handleChange}
                    name="payment"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          {/* Filtros */}
          <h1 className="text-center">Filtros</h1>
          <h3 className="text-center mt-4">Genero</h3>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="GeneroCheckbox1"
              value="Hombre"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="GeneroCheckbox1">Hombre</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="GeneroCheckbox2"
              value="Mujer"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="GeneroCheckbox2">Mujer</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="GeneroCheckbox3"
              value="No Binario"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="GeneroCheckbox3">No Binario</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="GeneroCheckbox4"
              value="Otro"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="GeneroCheckbox4">Otro</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="GeneroCheckbox5"
              value="No importa"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="GeneroCheckbox5">No importa</label>
          </div>

          <h3 className="text-center mt-4">Sexo</h3>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="SexoCheckbox1"
              name="sex"
              value="Masculino"
              checked={formData.sex === "Masculino"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              Masculino
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="SexoCheckbox2"
              name="sex"
              value="Femenino"
              checked={formData.sex === "Femenino"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Femenino
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="SexoCheckbox3"
              name="sex"
              value="Mixto"
              checked={formData.sex === "Mixto"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Mixto
            </label>
          </div>
          <h3 className="text-center mt-4">Rango de edad</h3>

          <label htmlFor="customRange1" className="form-label"></label>
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
      <div className="mt-5">
        <button className="btn btn-outline-secondary w-50" onClick={(e) => handleSubmit(e)}>Crear Evento</button>
      </div>
    </div>
  );
};

export default CreateSport;
