import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function RotaProtegida() {
  const { autenticado } = useAuth();

  if (!autenticado) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
