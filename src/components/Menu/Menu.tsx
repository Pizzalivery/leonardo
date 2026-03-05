import "./Menu.css";
import { DynamicIcon } from "lucide-react/dynamic";

interface MenuProps {
  children: React.ReactNode;
}

interface MenuItemProps {
  page: String;
  variant?: "default" | "active";
  iconName: any;
}

export const Menu = ({ children }: MenuProps) => {
  return (
    <>
      <ul className="menu">{children}</ul>
    </>
  );
};

export const MenuItem = ({ page, variant, iconName }: MenuItemProps) => {
  return (
    <>
      <li className="menu-item">
        <a className={`menu-link ${variant}`} href="">
          <DynamicIcon name={iconName} />
          <span>{page}</span>
        </a>
      </li>
    </>
  );
};
