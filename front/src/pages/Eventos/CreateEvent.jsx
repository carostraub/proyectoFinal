import React from "react";
import { useAuth } from "../../../src/context/AuthContext";
import AgeRange from "../../components/AgeRange";

const handleAgeRangeChange = ({ edadMin, edadMax }) => {
  setFormData({ ...formData, edadMin, edadMax });
};

const CreateEvent = () => {
  const { user } = useAuth();
  return (
    <div className="container text-center">
      <h1>Evento</h1>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="deporte" className="form-label">
              Tipo de Evento
            </label>
            <input
              type="text"
              className="form-control"
              id="deporte"
              placeholder="...."
            />
             <label htmlFor="deporte" className="form-label">
              Nombre de Evento
            </label>
            <input
              type="text"
              className="form-control"
              id="deporte"
              placeholder="...."
            />
            <label htmlFor="ubicacion" className="form-label">
              Ubicación
            </label>
            <input
              type="text"
              className="form-control"
              id="ubicacion"
              placeholder="...."
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
                  // name="date"
                  // value={formData.date}
                  // onChange={handleChange}
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
                  // name="time"
                  // value={formData.time}
                  // onChange={handleChange}
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
                    // name="missingPeople"
                    // value={formData.missingPeople}
                    // onChange={handleChange}
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
                    // value="si"
                    // checked={FormData.payment === "si"}
                    // onChange={handleChange}
                    // name="payment"

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
                    // value="no"
                    // checked={FormData.payment === "no"}
                    // onChange={handleChange}
                    // name="payment"
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
          <AgeRange onChange={handleAgeRangeChange} />
        </div>
      </div>
      <div className="mt-5">
        <button className="btn btn-outline-secondary w-50">Crear Evento</button>
      </div>
    </div>
  );
};

export default CreateEvent;
