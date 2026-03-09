import "./Navigation.css";
import {
  Home,
  Menu,
  ReceiptText,
  Search,
  UserRound,
} from "lucide-react";

const navigationItems = [
  {
    label: "Início",
    href: "",
    icon: Home,
    isActive: true,
  },
  {
    label: "Busca",
    href: "",
    icon: Search,
    isActive: false,
  },
  {
    label: "Menu",
    href: "",
    icon: Menu,
    isActive: false,
  },
  {
    label: "Pedidos",
    href: "",
    icon: ReceiptText,
    isActive: false,
  },
  {
    label: "Perfil",
    href: "",
    icon: UserRound,
    isActive: false,
  },
];

export function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation-wrapper">
        <h1 className="logo">Pizzalivery</h1>

        <ul className="menu">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label} className="menu-item">
                <a
                  className={`menu-link ${item.isActive ? "active" : ""}`}
                  href={item.href}
                >
                  <Icon />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}