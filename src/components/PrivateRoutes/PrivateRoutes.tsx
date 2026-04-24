import { Navigate, Outlet } from "react-router";

export const PrivateRoutes = () => {
  const userToken = sessionStorage.getItem("userToken");

  return userToken ? <Outlet /> : <Navigate to="/auth/login" />;
};