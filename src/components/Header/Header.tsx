import { ChevronDown } from "lucide-react";
import "./Header.css";

export interface HeaderProps {
  userName: string;
  enderecoEntrega: string;
}

export const Header = ({ userName, enderecoEntrega }: HeaderProps) => {
  return (
    <header className="header">
      <div className="delivery-address">
        <span className="delivery-text">
          <span>Entregando no endereço:</span>
          {enderecoEntrega}
          <button id="change-address">
            <ChevronDown />
            <span>Alterar</span>
          </button>
        </span>
      </div>
      <div className="greeting-use">
        <p>Olá {userName}</p>
        <a href="">Ver meus pontos</a>
      </div>
    </header>
  );
};
