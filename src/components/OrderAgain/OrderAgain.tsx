import "./OrderAgain.css";

interface OrderAgainProps {}

export const OrderAgain = ({}: OrderAgainProps) => {
  return (
    <section className="order-again">
      <h2 className="section-title">Peça novamente</h2>
      <img
        className="order-again-img"
        src="/src/assets/160572915436349060139189700225-1080p.jpg"
        alt="Pizza Margherita"
      />

      <p className="order-again-title">Margherita</p>
      <p className="order-again-price">R$ 93,00</p>
      <a className="order-again-add" href="">
        Adicionar a sacola
      </a>
    </section>
  );
};
