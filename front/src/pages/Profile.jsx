import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth(); // Obtener el usuario desde el contexto

  return (
    <div className="container mt-5">
      <div className="card text-center shadow-lg p-4">
        {/* Nombre del Usuario como título */}
        <h2 className="mt-3">{user?.name || "Usuario Desconocido"}</h2>
        {/* Foto de Perfil */}
        <img
          src={user?.profilePicture || "https://via.placeholder.com/150"}
          alt="Foto de perfil"
          className="rounded-circle mx-auto d-block"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />


        {/* Biografía */}
        <p className="text-muted">{user?.bio || "Este usuario aún no ha agregado una biografía."}</p>

        {/* Botón para editar perfil */}
        <button className="btn btn-primary">Editar Perfil</button>
      </div>
    </div>
  );
};

export default Profile;
