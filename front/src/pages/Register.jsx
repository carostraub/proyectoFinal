import React, { useState } from "react";
import { baseURL } from "../config/index";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        usuario: "",
        email: "",
        edad: "",
        password: "",
        profilePicture: null,
        genero: "",
        sexo: ""
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

        const dataToSend = new FormData();
        for (const key in formData) {
            dataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch(`${baseURL}/api/register`, {  
                method: "POST",
                body: dataToSend
            });

            const result = await response.json();

            if (response.ok) {
                alert("Registro exitoso 🎉");
                console.log("Usuario registrado:", result);
                navigate("/login"); //Redirige a login
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
                    <div className="col-md-6">
                        <h6>Nombre completo</h6>
                        <input className="mb-3" type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                        <h6>Nombre usuario</h6>
                        <input className="mb-3" type="text" name="usuario" placeholder="Usuario" value={formData.usuario} onChange={handleChange} required />
                        <h6>Email</h6>
                        <input className="mb-3" type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
                        <h6>Edad</h6>
                        <input className="mb-3" type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} required min="16" />
                    </div>
                    <div className="col-md-6">
                        <h6>Contraseña</h6>
                        <input className="mb-3" type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />

                        <h6>Selecciona una foto de perfil</h6>
                        <input className="mb-3" type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} required />

                        <h6>Sexo</h6>
                        <select className="mb-3" name="sexo" value={formData.sexo} onChange={handleChange} required>
                            <option value="">Selecciona tu sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Intersexual">Intersexual</option>
                        </select>

                        <h6>Género</h6>
                        <select className="mb-3" name="genero" value={formData.genero} onChange={handleChange} required>
                            <option value="">Selecciona tu género</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                            <option value="No binario">No binario</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                </div>

                <button className="btn btn-custom" type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
