import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Footer } from "../../Footer/Footer";
import { ChevronLeft } from "lucide-react";
import { IconButton } from "../../IconButton/IconButton";

export type AuthLayoutContext = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setNavigationHistory: React.Dispatch<React.SetStateAction<string>>;
};

function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState<string>("Pizzalivery");
  const [navigationHistory, setNavigationHistory] = useState<string>("");

  const canGoBack = window.history.state?.idx > 0;
  const handleBack = () => {
    if (canGoBack) {
      navigate(-1);
      return;
    }

    const currentPath = location.pathname;
    const explicitBackNavigation = currentPath === "/auth/cpf"
      ? "/auth/register"
      : currentPath === "/auth/register"
      ? "/auth/login"
      : currentPath === "/auth/login"
      ? "/auth/register"
      : "";

    if (explicitBackNavigation) {
      navigate(explicitBackNavigation);
    }
  };

  const currentPath = location.pathname;
  const explicitBackNavigation = currentPath === "/auth/cpf"
    ? "/auth/register"
    : currentPath === "/auth/register"
    ? "/auth/login"
    : currentPath === "/auth/login"
    ? "/auth/register"
    : "";

  const showBackButton = Boolean(explicitBackNavigation || canGoBack);
  const backNavigation = explicitBackNavigation;

  return (
    <>
      <header className="grid grid-cols-[1fr_auto_1fr] mx-auto px-4 w-full gap-4 my-6">
        <span>
          {showBackButton && (
            <IconButton
              label="Voltar"
              onClick={() => handleBack(backNavigation)}
            >
              <ChevronLeft />
            </IconButton>
          )}
        </span>
        <h1 className="text-center text-lg font-bold">{title}</h1>
        <span></span>
      </header>
      <main className="min-h-screen flex items-start justify-center px-4 pt-[88px]">
        <Outlet
          context={{
            setTitle,
            setNavigationHistory,
          }}
        />
      </main>
      <Footer />
    </>
  );
}

export default AuthLayout;
