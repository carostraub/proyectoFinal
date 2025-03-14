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
import CreateOther from "./pages/Eventos/CrearOther";
import MyEvent from "./pages/Eventos/MyEvent";
import CreateSecurity from "./pages/Eventos/CreateSecurity";
import CreateSport from "./pages/Eventos/CreateSport";
import Search from "./pages/Eventos/Search";
import Settings from "./pages/Settings";

export const Layout = () => {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/createevent" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/search/:id" element={<PrivateRoute><Search /></PrivateRoute>} />
        <Route path="/createsport" element={<PrivateRoute><CreateSport /></PrivateRoute>} />
        <Route path="/createsecurity" element={<PrivateRoute><CreateSecurity /></PrivateRoute>} />
        <Route path="/createother" element={<PrivateRoute><CreateOther /></PrivateRoute>} />
        <Route path="/myevent" element={<PrivateRoute><MyEvent /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        
        {/* <Route path="/" element={<Home />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/createsport" element={<CreateSport />} />
        <Route path="/createsecurity" element={<CreateSecurity />} />
        <Route path="/createother" element={<CreateOther />} />
        <Route path="/myevent" element={<MyEvent />} />
        <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </AuthProvider>
  );
};


