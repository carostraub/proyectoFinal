import React, { createContext, useContext, useState, useEffect } from "react";
import { baseURL } from "../config/index";
import { useNavigate } from "react-router-dom";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};

// Proveedor de autenticación que manejará el estado del usuario
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //  Comprobar si el usuario ya está autenticado al cargar la app
    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem("access_token"); //  Recuperar el token
        
                if (!token) {
                    console.log("No hay token disponible, usuario no autenticado");
                    setUser(null);
                    return;
                }
        
                const response = await fetch(`${baseURL}/api/profile`, { 
                    method: "GET",
                    headers: { 
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json" }, //  Enviar el token en la cabecera y asegura que el backend entienda el formato
                    credentials: "include", 
                });
        
                if (!response.ok) {
                    throw new Error("Usuario no autenticado");
                }
        
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error al verificar usuario:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        

        checkUser();
    }, []);

    //  Función para iniciar sesión
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${baseURL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("access_token", data.access_token); //  Guardar el token
                setUser(data.user);
                navigate("/"); //Redirige al Home
            } else {
                alert("Error al iniciar sesión: " + data.error);
            }
        } catch (error) {
            console.error("Error en login:", error);
        } finally {
            setLoading(false);
        }
    };

    //  Función para registrar un usuario
    const register = async (userData) => {
        setLoading(true);
        try {
            const response = await fetch(`${baseURL}/api/register`, {
                method: "POST",
                body: userData,
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                navigate("/");
            } else {
                alert("Error al registrarse: " + data.error);
            }
        } catch (error) {
            console.error("Error en registro:", error);
        } finally {
            setLoading(false);
        }
    };

    //  Función para actualizar perfil (nombre, usuario, contraseña, imagen)
    const updateProfile = async (profileData) => {
        setLoading(true);
        try {
            const response = await fetch(`${baseURL}/api/setting/${user.id}`, {
                method: "PATCH",
                body: profileData,
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user); // Se actualiza el contexto con el nuevo usuario
                alert("Perfil actualizado con éxito");
            } else {
                alert("Error al actualizar perfil: " + data.error);
            }
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            await fetch(`${baseURL}/api/logout`, {
                method: "POST",
                credentials: "include",
            });

            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Error en logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, updateProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
