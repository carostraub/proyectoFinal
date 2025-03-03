import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import { Home } from "../src/pages/Home";
import { Login } from "../src/pages/Login";
import { Register } from "../src/pages/Register";
import { Profile } from "../src/pages/Profile";
import { SearchEvent } from "../src/pages/SearchEvent";
import "bootstrap/dist/css/bootstrap.min.css";

export const Layout = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="search" element={<SearchEvent />} />
      </Routes>
    </AuthProvider>
  );
};
