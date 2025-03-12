import React, { useState } from "react";
import { baseURL } from "../config/index";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        age: "",
        password: "",
        profilePicture: null,
        gender: "",
        sex: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            profilePicture: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //  FormData para enviar la imagen y los demás datos
        const dataToSend = new FormData();
        for (const key in formData) {
            dataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch(`${baseURL}/register`, {
                method: "POST",
                body: dataToSend
            });

            const result = await response.json();

            if (response.ok) {
                alert("Registro exitoso 🎉");
                console.log("Usuario registrado:", result);
            } else {
                alert("Error en el registro: " + result.error);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Hubo un problema con el registro.");
        }
    };

    return (
        <div className="w-75 mx-auto my-5">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 ">
                        <h6>Nombre completo</h6>
                        <input className="mb-3" type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
                        <h6>Nombre usuario</h6>
                        <input className="mb-3" type="text" name="username" placeholder="Usuario" value={formData.username} onChange={handleChange} required />
                        <h6>Email</h6>
                        <input className="mb-3" type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
                        <h6>Edad</h6>
                        <input className="mb-3" type="number" name="age" placeholder="Edad" value={formData.age} onChange={handleChange} required min="16" />
                    </div>
                    <div className="col-md-6">
                        <h6>Contraseña</h6>
                        <input className="mb-3" type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />

                        {/* Input para subir foto de perfil */}
                        <h6>Selecciona una foto donde se vea tu cara </h6>
                        <input className="mb-3" type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} required />

                        {/* Selección de sexo */}
                        <h6>Sexo</h6>
                        <select className="mb-3" name="sex" value={formData.sex} onChange={handleChange} required>
                            <option value="">Selecciona tu sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Intersexual">Intersexual</option>
                        </select>

                        {/* Selección de género */}
                        <h6>Género</h6>
                        <select className="mb-3" name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Selecciona tu género</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                            <option value="No binario">No binario</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                </div>


                <button className="btn btn-primary" type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
