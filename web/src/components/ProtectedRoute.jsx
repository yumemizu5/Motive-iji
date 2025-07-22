import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isValid } = useContext(AuthContext);
  return isValid() ? children : <Navigate to="/login" replace />;
}
