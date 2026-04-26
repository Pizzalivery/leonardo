import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Footer } from "../../Footer/Footer";
import { ChevronLeft } from "lucide-react";
import { IconButton } from "../../IconButton/IconButton";

export type FormLayoutContext = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setNavigationHistory: React.Dispatch<React.SetStateAction<string>>;
};

function FormLayout() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("Pizzalivery");
  const [navigationHistory, setNavigationHistory] = useState<string>("");

  const handleBack = (navigation: string) => {
    navigate(navigation);
  };

  return (
    <>
      <header className="grid grid-cols-[1fr_auto_1fr] mx-auto px-5 w-full gap-4 my-6 ">
        <span>
          {navigationHistory && (
            <IconButton
              label="Voltar"
              onClick={() => handleBack(navigationHistory)}
            >
              <ChevronLeft />
            </IconButton>
          )}
        </span>
        <h1 className="text-center text-lg font-bold">{title}</h1>
        <span></span>
      </header>
      <main className="mx-auto px-5">
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

export default FormLayout;
