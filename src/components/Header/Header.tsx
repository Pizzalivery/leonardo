import "./Header.css";

export const Header = () => {
  return (
    <header className="header">

      <div className="delivery-address">
        <span className="delivery-text">
          <span>Entregando no endereço:</span>
          Rua Mesquita, 248
        </span>

        <button id="change-address">
          <i data-lucide="chevron-down"></i>
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