import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [formdata, setFormData] = useState({
    usuario: user?.usuario || "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formdata,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formdata.password && formdata.password !== formdata.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const dataSend = new FormData();

    // Agregar solo los campos que fueron cambiados
    if (formdata.usuario && formdata.usuario.trim() !== user.usuario) {
      dataSend.append("usuario", formdata.usuario);
    }

    if (formdata.password) {
      dataSend.append("password", formdata.password);
    }

    if (formdata.profilePicture) {
      dataSend.append("profilePicture", formdata.profilePicture);
    }

    if ([...dataSend.entries()].length === 0) {
      alert("No has ingresado ningún dato para actualizar.");
      return;
    }

    await updateProfile(dataSend);
  };

  return (
    <form onSubmit={handleSubmit} className="container-fluid">
      <div className="row">
        <div className="col-6">
          <label htmlFor="username">Cambiar usuario</label>
          <input
            type="text"
            id="username"
            name="usuario"
            className="form-control text-center"
            placeholder="Nuevo nombre de usuario"
            value={formdata.usuario}
            onChange={handleChange}
          />

          <label htmlFor="password">Cambiar contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control text-center"
            placeholder="Nueva contraseña"
            value={formdata.password}
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control text-center"
            placeholder="Confirma nueva contraseña"
            value={formdata.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="col-6">
          <label htmlFor="file">Cambiar foto de perfil</label>
          <input
            type="file"
            id="file"
            className="form-control text-center"
            accept="image/*"
            onChange={handleFileChange}
          />
          <p>Escoge un archivo que contenga tu rostro</p>
          <h5 className="text-center mt-4">IMPORTANTE</h5>
          <p className="mb-5">
            Recuerda que tu foto de perfil tiene que contener tu cara para que
            otros usuarios te puedan reconocer al momento del encuentro. En el
            caso de no tener una foto donde se puedan distinguir tus rasgos, el
            otro usuario puede reportar tu cuenta.
          </p>
        </div>

        <div className="col-12 d-flex justify-content-end mt-5">
          <button type="submit" className="btn bg-body-secondary w-50 p-3">
            Guardar cambios
          </button>
        </div>
      </div>
    </form>
  );
};

export default Settings;
