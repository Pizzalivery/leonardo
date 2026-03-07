import "./Navigation.css";
import { Home, Search, Menu, ReceiptText, UserRound } from "lucide-react";

function Navigation() {
  return (
    <nav id="navigation">
      <div className="navigation-wrapper">
        <h1 className="logo">Pizzalivery</h1>

        <ul className="menu">
          <li className="menu-item">
            <a className="menu-link active" href="">
              <Home />
              <span>Início</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="">
              <Search />
              <span>Busca</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="">
              <Menu />
              <span>Menu</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="">
              <ReceiptText />
              <span>Pedidos</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="">
              <UserRound />
              <span>Perfil</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;