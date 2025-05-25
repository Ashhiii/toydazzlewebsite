import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  // Check if the user is logged in by retrieving user data from localStorage
  const isLoggedIn = JSON.parse(localStorage.getItem("users"));

  // If user is logged in, render the child routes using Outlet
  // If user is not logged in, navigate to "/" (home page)
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
