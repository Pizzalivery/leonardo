import type { ReactElement } from "react";
import "./Navigation.css";

interface NavigationProps {
  children: React.ReactNode;
}

export interface NavigationMenuItemProps {
  icon: ReactElement;
  name: string;
  variant?: "default" | "active";
}

export const Navigation = ({ children }: NavigationProps) => {
  return (
    <nav id="navigation">
      <div className="navigation-wrapper">
        <h1 className="logo">Pizzalivery</h1>
        <ul className="menu">{children}</ul>
      </div>
    </nav>
  );
};

export const NavigationMenuItem = ({
  icon,
  name,
  variant = "default",
}: NavigationMenuItemProps) => {
  return (
    <li className="menu-item">
      <a className={`menu-link ${variant}`} href="">
        {icon}
        <span>{name}</span>
      </a>
    </li>
  );
};
