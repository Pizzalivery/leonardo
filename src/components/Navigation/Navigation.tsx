import { Home, Search, Menu, ReceiptText, UserRound } from "lucide-react";
import "./Navigation.css";

interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
  return (
    <nav id="navigation">
      <div className="navigation-wrapper">
        <h1 className="logo">Pizzalivery</h1>
        <ul className="menu">
          <li className="menu-item">
            <a className="menu-link active" href="">
              <Home size={20} />
              <span>Início</span>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="">
              <Search size={20} />
              <span>Busca</span>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="">
              <Menu size={20} />
              <span>Menu</span>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="">
              <ReceiptText size={20} />
              <span>Pedidos</span>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="">
              <UserRound size={20} />
              <span>Perfil</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
