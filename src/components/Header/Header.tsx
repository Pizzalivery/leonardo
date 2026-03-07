import "./Header.css";

interface HeaderProps {
  onChangeAdress: () => void;
}

export const Header = ({ onChangeAdress }: HeaderProps) => {
  return (
 <header className="header">
      <div className="delivery-address">
        <span className="delivery-text">
          <span>Entregando no endereço:</span>
          Rua Mesquita, 248
          <button id="change-address" onClick={onChangeAdress}>
            <i data-lucide="chevron-down"></i>
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
};