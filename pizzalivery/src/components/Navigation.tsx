import "./Navigation.css";
import { Home, Search, Menu, ReceiptText, UserRound } from "lucide-react";
import NavItem from "./NavItem";
function Navigation() {
  return (
    <nav id="navigation">
      <div className="navigation-wrapper">
        <h1 className="logo">Pizzalivery</h1>

        <ul className="menu">
          <NavItem icon={<Home size={18} />} label="Início" isActive />
          <NavItem icon={<Search size={18} />} label="Busca" />
          <NavItem icon={<Menu size={18} />} label="Menu" />
          <NavItem icon={<ReceiptText size={18} />} label="Pedidos" />
          <NavItem icon={<UserRound size={18} />} label="Perfil" />
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;