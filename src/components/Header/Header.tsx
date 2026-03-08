import { ChevronDown } from "lucide-react";
import "./Header.css";

export interface HeaderUserInfo {
  userName: string;
  enderecoEntrega: string;
  onOpenDialog?: () => void; 
}

export function Header({ userName, enderecoEntrega, onOpenDialog }: HeaderUserInfo) {
  return (
    <header className="header">
      <div className="delivery-address">
        <div className="delivery-text">
          <span>Entregando no endereço:</span>
          <strong className="street-name">{enderecoEntrega}</strong>
        </div>

        <button 
          id="change-address" 
          onClick={onOpenDialog}
          type="button"
        >
          <ChevronDown size={16} />
          <span>Alterar</span>
        </button>
      </div>

      <section className="greeting-user">
        <div className="user-info">
          <p>Olá, <strong>{userName}</strong></p>
          <a href="#pontos" className="points-link">Ver meus pontos</a>
        </div>
      </section>
    </header>
  );
}