import "./OrderAgain.css";

interface OrderAgainProps {
  title: string;
  price: string;
  image: {
    src: string;
    alt: string;
  };
}

export function OrderAgain({ title, price, image }: OrderAgainProps) {
  return (
    <section className="order-again">
      <h2 className="section-title">Peça novamente</h2>

      <img
        className="order-again-img"
        src={image.src}
        alt={image.alt}
      />

      <p className="order-again-title">{title}</p>
      <p className="order-again-price">{price}</p>

      <a className="order-again-add" href="#">
        Adicionar à sacola
      </a>
    </section>
  );
}