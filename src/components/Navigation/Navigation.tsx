import "./Navigation.css"

export const Navigation = () => {
  return (
    <nav id="navigation">
      <div className="navigation-wrapper">
        <h1 className="logo">Pizzalivery</h1>
        <ul className="menu">
          <li className="menu-item">
            <a className="menu-link active" href="">
              <i data-lucide="home"></i>
              <span>Início</span>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="">
              <i data-lucide="search"></i>
              <span>Busca</span>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="">
              <i data-lucide="menu"></i>
              <span>Menu</span>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="">
              <i data-lucide="receipt-text"></i>
              <span>Pedidos</span>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link" href="">
              <i data-lucide="user-round"></i>
              <span>Perfil</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};