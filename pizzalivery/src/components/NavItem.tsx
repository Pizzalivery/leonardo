type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
};

function NavItem({ icon, label, isActive = false }: NavItemProps) {
  return (
    <li className="menu-item">
      <a className={`menu-link ${isActive ? "active" : ""}`} href="#">
        {icon}
        <span>{label}</span>
      </a>
    </li>
  );
}

export default NavItem;