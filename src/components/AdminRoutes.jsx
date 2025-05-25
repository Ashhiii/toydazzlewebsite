import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // Check if user is logged in and is an admin
  const isAdmin = user && user.role === "admin";

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
  