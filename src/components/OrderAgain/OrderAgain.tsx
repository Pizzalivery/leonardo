import "./OrderAgain.css";
import { ProductCardTitle } from "../ProductCard/ProductCard";

interface OrderAgainProps {
  title: string;
  price: string;
  image: {
    src: string;
    alt: string;
  };
}

export const OrderAgain = ({
  image,
  title,
  price,
}: OrderAgainProps) => {
  return (
    <section className="order-again">
      <ProductCardTitle sectionTitle="Peça novamente" />
      <img className="order-again-img" src={image.src} alt={image.alt}/>
      <p className="order-again-title">{title}</p>
      <p className="order-again-price">{price}</p>
      <a className="order-again-add">Adicionar a sacola</a>
    </section>
  );
};