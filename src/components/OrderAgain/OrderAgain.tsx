import "./OrderAgain.css";

export interface OrderAgainProps {
  item: string;
  price: string;
  img: string;
}

export const OrderAgain = ({ item, price, img }: OrderAgainProps) => {
  return (
    <section className="order-again">
      <h2 className="section-title">Peça novamente</h2>
      <img className="order-again-img" src={img} alt={item} />
      <p className="order-again-title">{item}</p>
      <p className="order-again-price">{price}</p>
      <a className="order-again-add" href="">
        Adicionar à sacola
      </a>
    </section>
  );
};
