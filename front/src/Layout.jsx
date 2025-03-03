import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";
import { Home } from "../src/pages/Home";

export const Layout = () => {
  return (
    <AuthContext>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AuthContext>
  );
};
