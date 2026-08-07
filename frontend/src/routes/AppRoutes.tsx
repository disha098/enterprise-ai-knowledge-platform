import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";

import Documents from "../pages/Documents";
import UploadDocument from "../pages/UploadDocument";
import DocumentDetails from "../pages/DocumentDetails";

import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
          path="/documents"
          element={<Documents />}
      />

      <Route
          path="/documents/upload"
          element={<UploadDocument />}
      />

      <Route
          path="/documents/:id"
          element={<DocumentDetails />}
      />
    </Routes>
  );
}