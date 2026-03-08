import SectionTitle from "../components/SectionTitle";

function OrderAgain() {
  return (
    <section className="order-again">
      <SectionTitle title="Peça novamente" />

      <img
        className="order-again-img"
        src="/images/160572915436349060139189700225-1080p.jpg"
        alt="Pizza Margherita"
      />

      <p className="order-again-title">Margherita</p>
      <p className="order-again-price">R$ 93,00</p>

      <a className="order-again-add" href="#">
        Adicionar à sacola
      </a>
    </section>
  );
}

export default OrderAgain;