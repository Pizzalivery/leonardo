import { Navigate, Outlet } from "react-router";

export const PrivateRoutes = () => {
  const userToken = JSON.parse(sessionStorage.getItem("userToken") || "null");

  return userToken ? <Outlet /> : <Navigate to="/auth/login" />;
};
