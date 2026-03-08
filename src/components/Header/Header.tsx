import { ChevronDown } from "lucide-react";
import "./Header.css";

// O Header só dispara a ação de abrir o dialog; o controle do estado fica na página.
type HeaderProps = {
  onOpenAddressDialog: () => void;
};

function Header({ onOpenAddressDialog }: HeaderProps) {
  return (
    <header className="header">
      <div className="delivery-address">
        <span className="delivery-text">
          <span>Entregando no endereço:</span>{" "}
          Rua Mesquita, 248{" "}
          <button
            id="change-address"
            type="button"
            onClick={onOpenAddressDialog}
          >
            <ChevronDown />
            <span>Alterar</span>
          </button>
        </span>
      </div>

      <div className="greeting-user">
        <p>Olá, Daniela</p>
        <a href="">Ver meus pontos</a>
      </div>
    </header>
  );
}

export default Header;