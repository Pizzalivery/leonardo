import { ChevronDown } from "lucide-react";
import "./Header.css";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  return (
    <header className="header">
      <div className="delivery-address">
        <span className="delivery-text">
          <span>Entregando no endereço:</span>
          Rua Mesquita, 248
        </span>
        <button id="change-address">
          <ChevronDown size={20} />
          <span>Alterar</span>
        </button>
      </div>
      <div className="greeting-user">
        <p>Olá, Daniela</p>
        <a href="">Ver meus pontos</a>
      </div>
    </header>
  );
};
