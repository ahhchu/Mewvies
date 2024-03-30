import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
