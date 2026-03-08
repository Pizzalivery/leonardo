import "./Navbar.css"

interface NavbarProps {
    title: string
    children: React.ReactNode
}

interface MenuItemProps {
    children: React.ReactNode;
    variant?: "default" | "active"
    title: string
}

export const Navbar = ({title, children}: NavbarProps) => {
    return (
    <nav id="navigation">
      <div className="navigation-wrapper">
        <h1 className="logo">{title}</h1>
        <ul className="menu">
            {children}
        </ul>
      </div>
    </nav>
    )
}

export const MenuItem = ({children, variant = "default", title}: MenuItemProps) => {
    return (
        <li className="menu-item">
            <a className={`menu-link ${variant}`} href="">
              {children}
              <span>{title}</span>
            </a>
          </li>
    )
}