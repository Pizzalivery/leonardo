import "./OrderAgain.css";
import margheritaImg from "../../assets/160572915436349060139189700225-1080p.jpg";

function OrderAgain() {
  return (
    <section className="order-again">
      <h2 className="section-title">Peça novamente</h2>

      <div className="order-again-card">
        <img
          className="order-again-img"
          src={margheritaImg}
          alt="Pizza Margherita"
        />

        <div className="order-again-info">
          <p className="order-again-title">Margherita</p>
          <p className="order-again-price">R$ 93,00</p>
          <a className="order-again-add" href="">
            Adicionar a sacola
          </a>
        </div>
      </div>
    </section>
  );
}

export default OrderAgain;