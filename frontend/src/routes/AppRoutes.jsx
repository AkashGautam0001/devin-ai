import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../screen/Login";
import Register from "../screen/Register";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
