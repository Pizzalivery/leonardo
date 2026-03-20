import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Footer } from "../../Footer/Footer";
import { Navigation } from "../../Navigation/Navigation";
import { MainMenu, MainMenuItem } from "../../MainMenu/MainMenu";
import { mainMenuItems } from "../../../utils/mainMenu";
import { Logo } from "../../Logo/Logo";
import { ChevronLeft } from "lucide-react";
import { IconButton } from "../../IconButton/IconButton";

import "./NavigationLayout.css";

export type NavigationLayoutContext = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setNavigationHistory: React.Dispatch<React.SetStateAction<string>>;
};

function NavigationLayout() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("Página Inicial");
  const [navigationHistory, setNavigationHistory] = useState<string>("");

  const handleBack = (navigation: string) => {
    navigate(navigation);
  };

  return (
    <>
      <header className="order-layout-header">
        <IconButton
          label="Voltar"
          onClick={() => handleBack(navigationHistory)}
        >
          <ChevronLeft />
        </IconButton>
        <h1 className="order-layout-title">{title}</h1>
      </header>
      <Navigation>
        <Logo />
        <MainMenu>
          {mainMenuItems.map((item) => (
            <MainMenuItem key={item.id} link={item.link} icon={item.icon}>
              {item.label}
            </MainMenuItem>
          ))}
        </MainMenu>
      </Navigation>
      <main>
        <Outlet context={{ setTitle, setNavigationHistory }} />
      </main>
      <Footer />
    </>
  );
}

export default NavigationLayout;
