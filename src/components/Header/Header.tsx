import { Home, Search, Menu, ClipboardList, User } from "lucide-react";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Pizzalivery</h1>
        
        <nav className="nav-menu">
          <a href="#" className="nav-link active">
            <Home size={20} />
            <span>Início</span>
          </a>
          <a href="#" className="nav-link">
            <Search size={20} />
            <span>Busca</span>
          </a>
          <a href="#" className="nav-link">
            <Menu size={20} />
            <span>Menu</span>
          </a>
          <a href="#" className="nav-link">
            <ClipboardList size={20} />
            <span>Pedidos</span>
          </a>
          <a href="#" className="nav-link">
            <User size={20} />
            <span>Perfil</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
