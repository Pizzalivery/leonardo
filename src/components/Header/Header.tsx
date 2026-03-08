import { Home, Search, Menu, ReceiptText, UserRound, ChevronDown } from "lucide-react";
import "./Header.css";

export default function Header() {
  return (
    <>
      <nav id="navigation">
        <div className="navigation-wrapper">
          <h1 className="logo">Pizzalivery</h1>
          <ul className="menu">
            <li className="menu-item">
              <a className="menu-link active" href="#">
                <Home size={20} />
                <span>Início</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-link" href="#">
                <Search size={20} />
                <span>Busca</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-link" href="#">
                <Menu size={20} />
                <span>Menu</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-link" href="#">
                <ReceiptText size={20} />
                <span>Pedidos</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-link" href="#">
                <UserRound size={20} />
                <span>Perfil</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <header className="header">
        <div className="delivery-address">
          <span className="delivery-text">
            <span>Entregando no endereço:</span>
            {" "}Rua Mesquita, 248
            <button id="change-address">
              <ChevronDown size={16} />
              <span>Alterar</span>
            </button>
          </span>
        </div>
        <div className="greeting-user">
          <p>Olá, Daniela</p>
          <a href="#">Ver meus pontos</a>
        </div>
      </header>
    </>
  );
}
