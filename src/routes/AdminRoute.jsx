import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  if (role !== "ADMIN") {
    localStorage.clear();
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
