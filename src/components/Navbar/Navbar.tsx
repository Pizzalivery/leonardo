import "./Navbar.css";
import { House } from "lucide-react";
import { Search  } from "lucide-react";
import { Menu  } from "lucide-react";
import { ReceiptText } from "lucide-react";
import { UserRound } from "lucide-react";

export const Navbar = () => {
  return (
    <nav id="navigation">
      <div className="navigation-wrapper">
        <h1 className="logo">Pizzalivery</h1>
        <ul className="menu">
          <li className="menu-item">
            <a className="menu-link active"  href="">
              <House/>
              <span>Início</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="">
              <Search/>
              <span>Busca</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="">
              <Menu/>
              <span>Menu</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="">
              <ReceiptText/>
              <span>Pedidos</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="">
              <UserRound/>
              <span>Perfil</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};