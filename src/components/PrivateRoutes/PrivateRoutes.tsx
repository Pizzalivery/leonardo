import { Outlet } from "react-router";

export const PrivateRoutes = () => {
  // Permite navegação sem login para todas as páginas.
  return <Outlet />;
};
