import React, {useState} from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateProfile } = useAuth(); // Obtener el usuario desde el contexto
  const [bio, setBio] = useState(user?.biography || ""); // Estado local para la biografía
  const [isEditing, setIsEditing] = useState(false); // Estado para alternar entre vista y edición

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("biography", bio); // Agrega la biografía al formData

    await updateProfile(formData); // Llama a la función del AuthContext para actualizar
    setIsEditing(false); // Desactiva el modo de edición después de guardar
  };


  return (
    <div className="container mt-5">
      <div className="card text-center shadow-lg p-4">
        {/* Nombre del Usuario como título */}
        <h2 className="mt-3">{user?.usuario || "Usuario Desconocido"}</h2>
        <div className="row">
          <div className="col-md-6 col-12">

            {/* Foto de Perfil */}
            <img
              src={user?.profilePicture || "https://via.placeholder.com/150"}
              onError={(e) => { e.target.onerror = null }}
              alt="Foto de perfil"
              className="rounded-circle mx-auto d-block"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6 col-12">
            <h2 className="mt-3">{user?.nombre || "Usuario desconocido"}</h2>
            <h4 className="mt-3">{user?.edad || "Usuario desconocido"} años </h4>
            {/* Biografía editable solo si el usuario es dueño del perfil */}
            {isEditing ? (
              <textarea
                className="form-control mt-3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              <p className="text-muted mt-3">{user?.biography || "Este usuario aún no ha agregado una biografía."}</p>
            )}

            {/* Botones para editar y guardar */}
            {user && user.id === user?.id && (
              isEditing ? (
                <button className="btn btn-success mt-3" onClick={handleSave}>
                  Guardar cambios
                </button>
              ) : (
                <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>
                  Editar Biografía
                </button>
              )
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;