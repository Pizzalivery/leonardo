import type { ReactElement } from "react";
import "./TopMenu.css";

interface TopMenuProps {
  children: React.ReactNode;
}

export interface TopMenuItemProps {
  icon: ReactElement;
  name: String;
  variant?: "default" | "active";
}

export const TopMenu = ({ children }: TopMenuProps) => {
  return (
    <nav id="navigation">
      <div className="navigation-wrapper">
        <h1 className="logo">Pizzalivery</h1>
        <ul className="menu">{children}</ul>
      </div>
    </nav>
  );
};

export const TopMenuItem = ({
  icon,
  name,
  variant = "default",
}: TopMenuItemProps) => {
  return (
    <li className="menu-item">
      <a className={`menu-link ${variant}`} href="">
        {icon}
        <span>{name}</span>
      </a>
    </li>
  );
};
