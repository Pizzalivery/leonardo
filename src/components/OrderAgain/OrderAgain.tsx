import "./OrderAgain.css";

export interface OrderAgainProps {
  item: string;
  price: string;
  img: string;
}

export const OrderAgain = ({ item, price, img }: OrderAgainProps) => (
  <section className="order-again">
    <h2 className="section-title">Peça novamente</h2>
    
    <img src={img} alt={item} className="order-again-img" />
    
    <>
      <p className="order-again-title">{item}</p>
      <p className="order-again-price">{price}</p>
    </>

    <a href="#" className="order-again-add">
      Adicionar à sacola
    </a>
  </section>
);