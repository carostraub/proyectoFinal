import React from "react";

const Settings = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <label htmlFor="">Cambiar usuario</label>
          <input
            type="text"
            className="form-control text-center"
            placeholder="Nuevo nombre de usuario"
          />

          <label htmlFor="">Cambiar contraseña</label>
          <input
            type="text"
            className="form-control text-center"
            placeholder="Nueva contraseña"
          />

          <label htmlFor="">Confirmar contraseña</label>
          <input
            type="text"
            className="form-control text-center"
            placeholder="Confirma nueva contraseña"
          />
        </div>
        <div className="col-6">
          <label htmlFor="file">Cambiar foto de perfil</label>
          <input type="file" id="file" className="form-control text-center" />
          <p>Escoge un archivo que contenga tu rostro</p>
          <h5 className="text-center mt-4">IMPORTANTE</h5>
          <p className="mb-5">
            Recuerda que tu foto de perfil tiene que contener tu cara para que
            otros usuario te puedan reconocer al momento del encuentro. En el
            caso de no tener una foto donde se pueda distinguir tu rasgos el
            otro usuario puede resportar tu cuenta.
          </p>
        </div>
        <div className="col-12 d-flex justify-content-end mt-5">
          <button className="btn bg-body-secondary w-50 p-3">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
