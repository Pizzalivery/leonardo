import "./Menu.css";
import type { ReactElement } from "react";

interface MenuProps {
  children: React.ReactNode;
}

interface MenuItemProps {
  page: String;
  variant?: "default" | "active";
  icon: ReactElement;
}

export const Menu = ({ children }: MenuProps) => {
  return (
    <>
      <ul className="menu">{children}</ul>
    </>
  );
};

export const MenuItem = ({ page, variant, icon }: MenuItemProps) => {
  return (
    <>
      <li className="menu-item">
        <a className={`menu-link ${variant}`} href="">
          {icon}
          <span>{page}</span>
        </a>
      </li>
    </>
  );
};
