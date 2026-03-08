import "./UserGreeting.css";

interface UserGreetingProps {
  name: string;
  points: number;
  address: string;
}

export const UserGreeting = ({ name, points, address }: UserGreetingProps) => {
  return (
    <section className="greeting-section">
      <div className="greeting-container">
        <div className="user-info">
          <h2 className="user-name">Olá, {name}</h2>
          <a href="#" className="points-link">Ver meus pontos</a>
        </div>
        
        <div className="delivery-info">
          <span className="delivery-label">Entregando no endereço: </span>
          <span className="delivery-address">{address}</span>
          <button className="change-address-btn">Alterar</button>
        </div>
      </div>
    </section>
  );
};
