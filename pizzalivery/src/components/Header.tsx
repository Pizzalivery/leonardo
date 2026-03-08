import { ChevronDown } from "lucide-react";

type HeaderProps = {
  onOpenAddress: () => void;
};

function Header({ onOpenAddress }: HeaderProps) {
  return (
    <header className="header">
      <div className="delivery-address">
        <span className="delivery-text">
          <span>Entregando no endereço:</span> Rua Mesquita, 248
          <button id="change-address" type="button" onClick={onOpenAddress}>
            <ChevronDown size={18} />
            <span>Alterar</span>
          </button>
        </span>
      </div>

      <div className="greeting-user">
        <p>Olá, Daniela</p>
        <a href="#">Ver meus pontos</a>
      </div>
    </header>
  );
}

export default Header;