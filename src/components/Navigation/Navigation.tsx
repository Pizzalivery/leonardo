import "./Navigation.css";
import {
  Home,
  Search,
  Menu,
  ReceiptText,
  UserRound,
} from "lucide-react";

export function Navigation() {
  return (
    <nav id="navigation">
      <div className="navigation-wrapper">
        <h1 className="logo">Pizzalivery</h1>

        <ul className="menu">
          <li className="menu-item">
            <a href="#" className="menu-link active">
              <Home />
              <span>Início</span>
            </a>
          </li>

          <li className="menu-item">
            <a href="#" className="menu-link">
              <Search />
              <span>Busca</span>
            </a>
          </li>

          <li className="menu-item">
            <a href="#" className="menu-link">
              <Menu />
              <span>Menu</span>
            </a>
          </li>

          <li className="menu-item">
            <a href="#" className="menu-link">
              <ReceiptText />
              <span>Pedidos</span>
            </a>
          </li>

          <li className="menu-item">
            <a href="#" className="menu-link">
              <UserRound />
              <span>Perfil</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}