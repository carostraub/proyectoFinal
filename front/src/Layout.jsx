import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import Home from "../src/pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/Eventos/CreateEvent";
import NavBar from "./components/NavBar";
import PrivateRoute from "./pages/PrivateRoute";
import CrearDeporte from "./pages/Eventos/CrearDeporte";
import CrearSeguridad from "./pages/Eventos/CrearSeguridad";
import CreateOther from "./pages/Eventos/CrearOtro";
import Buscar from "./pages/Eventos/Buscar";
import MyEvent from "./pages/Eventos/MyEvent";

export const Layout = () => {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="search" element={<Buscar />} />
        <Route path="createsport" element={<CrearDeporte />} />
        <Route path="createsecurity" element={<CrearSeguridad />} />
        <Route path="createother" element={<CreateOther />} />

        <Route path="myevent" element={<MyEvent />} />
      </Routes>
    </AuthProvider>
  );
};
