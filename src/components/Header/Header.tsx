import "./Header.css";
import { ChevronDown } from "lucide-react";
import { Button } from "../Button/Button";

interface HeaderProps {
  onOpenDialog: () => void;
}

export function Header({ onOpenDialog }: HeaderProps) {
  return (
    <header className="header">
      <div className="delivery-address">
        <span className="delivery-text">Entregando no endereço: </span>
          <span className="street-name">Rua Mesquita, 248</span> 
        <Button variant="change-address" onClick={onOpenDialog}>
          <ChevronDown />
           <span>Alterar</span>
        </Button>
      </div>

      <div className="greeting-user">
        <p>Olá, Daniela</p>
        <a href="">Ver meus pontos</a>
      </div>
    </header>
  );
}