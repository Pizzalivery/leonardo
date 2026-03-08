import margheritaImg from "../../assets/160572915436349060139189700225-1080p.jpg";

import "./OrderAgain.css";

function OrderAgain() {
  return (
    <section className="order-again">
      <h2 className="section-title">Peça novamente</h2>

      <img
        className="order-again-img"
        src={margheritaImg}
        alt="Pizza Margherita"
      />

      <p className="order-again-title">Margherita</p>
      <p className="order-again-price">R$ 93,00</p>
      <a className="order-again-add" href="">
        Adicionar a sacola
      </a>
    </section>
  );
}

export default OrderAgain;