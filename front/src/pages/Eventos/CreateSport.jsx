import React, { useState } from "react";
import { useAuth } from "../../../src/context/AuthContext";

const CreateSport = () => {
  const { user } = useAuth();

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
    gender: "",
    ageRange: "",

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
    console.log(formData)
  }

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
              <select className="form-select" id="floatingSelect" aria-label="Floating label select example"
                name="nameSport"
                onChange={handleChange}
              >
                <option selected>...</option>
                <option value="Futbol">Futbol</option>
                <option value="Basket">Basket</option>
                <option value="Volley">Volley</option>
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
              value="option1"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              Hombre
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="GeneroCheckbox2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Mujer
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="GeneroCheckbox3"
              value="option3"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              No Binario
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="GeneroCheckbox4"
              value="option4"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Otro
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="GeneroCheckbox5"
              value="option5"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              No importa
            </label>
          </div>
          <h3 className="text-center mt-4">Sexo</h3>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="SexoCheckbox1"
              value="option1"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              Masculino
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="SexoCheckbox2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Femenino
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="SexoCheckbox3"
              value="option3"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Mixto
            </label>
          </div>
          <h3 className="text-center mt-4">Rango de edad</h3>

          <label htmlFor="customRange1" className="form-label"></label>
          <input type="range" className="form-range" id="customRange1"></input>
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
