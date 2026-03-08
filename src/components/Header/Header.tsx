import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Pizzalivery</h1>
        
        <nav className="nav-menu">
          <div className="nav-item active"><span>🏠Início</span></div>
          <div className="nav-item"><span>🔍 Busca</span></div>
          <div className="nav-item"><span>☰ Menu</span></div>
          <div className="nav-item"><span>🧾Pedidos</span></div>
          <div className="nav-item"><span>👤Perfil</span></div>
        </nav>
      </div>

      <section className="user-bar">
        <div className="user-info">
          <p>Olá, <strong>Daniela</strong></p>
          <span className="points">Ver meus pontos</span>
        </div>
        <div className="address-info">
          <span>Entregando no endereço: <span className="address">Rua Mesquita, 248</span></span>
          <button className="change-btn">Alterar</button>
        </div>
      </section>
    </header>
  );
};