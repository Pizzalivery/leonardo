import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";
import "./MainMenu.css";

interface MainMenuProps {
  children: React.ReactNode;
}

interface MainMenuItemProps {
  children: React.ReactNode;
  icon: React.ReactElement<LucideIcon>;
  link: string;
}

export const MainMenu = ({ children }: MainMenuProps) => {
  return <ul className="main-menu">{children}</ul>;
};

export const MainMenuItem = ({ children, icon, link }: MainMenuItemProps) => {
  return (
    <li className="main-menu-item">
      <NavLink
        className={({ isActive }) =>
          `main-menu-link ${isActive ? "active" : ""}`
        }
        to={link}
      >
        {icon}
        <span>{children}</span>
      </NavLink>
    </li>
  );
};
