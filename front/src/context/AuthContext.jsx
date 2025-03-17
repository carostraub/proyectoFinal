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
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const text = await response.text(); // Intentamos leer la respuesta

        try {
          const data = JSON.parse(text);
          if (response.ok) {
            setUser(data);
          } else {
            console.error("Error en autenticación:", data.error || text);
            setUser(null);
          }
        } catch (error) {
          console.error("Error procesando respuesta:", text);
          setUser(null);
        }
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
        console.log("Token guardado:", localStorage.getItem("access_token"));
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

  const updateProfile = async (profileData) => {
    if (!user) {
        console.error("Error: No hay usuario autenticado.");
        return;
    }

    if (!profileData) {
        console.error("Error: No se proporcionaron datos de perfil.");
        return;
      }
      
      console.log("Enviando datos de perfil:", [...profileData.entries()]); // Ver datos antes de enviarlos
      

    setLoading(true);
    try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(`${baseURL}/api/setting/${user.id}`, {
            method: "PATCH",
            body: profileData, // Enviamos FormData directamente
            headers: {
                Authorization: `Bearer ${token}`, // No se añade Content-Type con FormData
            },
            credentials: "include",
        });

        const text = await response.text();
        console.log("Respuesta del servidor:", response, text);  // 🛠 Agrega esto para ver la respuesta real

        let data;
        try {
            data = JSON.parse(text);
        } catch (parseError) {
            console.error("Error en formato JSON:", parseError);
            alert("Error en el formato de la respuesta del servidor.");
            return;
        }

        if (response.ok && data?.user) {
            setUser(data.user);
            alert("Perfil actualizado con éxito");
        } else {
            console.error("Error al actualizar perfil:", data?.error || "Error desconocido");
            alert("Error al actualizar perfil: " + (data?.error || "Error desconocido"));
        }
    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        alert("No se pudo conectar con el servidor. Inténtalo más tarde.");
    } finally {
        setLoading(false);
    }
};

 //Función para cambiar la biografia, apunta a diferente endpoint por lo que el fetch es distinto
 const updateBio = async (newBio) => {
  if (!user) {
      console.error("Error: No hay usuario autenticado.");
      return;
  }

  if (!newBio) {
      console.error("Error: La biografía está vacía.");
      return;
  }

  const formData = new FormData();
  formData.append("biography", newBio);

  console.log("Enviando biografía:", newBio); // Verifica lo que se está enviando

  setLoading(true);
  try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${baseURL}/api/profile`, {
          method: "PATCH",
          body: formData,
          headers: {
              Authorization: `Bearer ${token}`,
          },
          credentials: "include",
      });

      const text = await response.text();
      console.log("Respuesta del servidor:", response, text);

      let data;
      try {
          data = JSON.parse(text);
      } catch (parseError) {
          console.error("Error en formato JSON:", parseError);
          alert("Error en el formato de la respuesta del servidor.");
          return;
      }

      if (response.ok && data?.user) {
          setUser(data.user);
          alert("Biografía actualizada con éxito");
      } else {
          console.error("Error al actualizar biografía:", data?.error || "Error desconocido");
          alert("Error al actualizar biografía: " + (data?.error || "Error desconocido"));
      }
  } catch (error) {
      console.error("Error al actualizar biografía:", error);
      alert("No se pudo conectar con el servidor. Inténtalo más tarde.");
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
      localStorage.removeItem("access_token");
      navigate("/login");
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, updateProfile, updateBio, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
