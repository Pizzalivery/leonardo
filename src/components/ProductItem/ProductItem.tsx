import { Heading } from "../Heading/Heading";
import "./ProductItem.css";

interface ProductItemProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

export const ProductItem = ({
  image,
  title,
  description,
  price,
}: ProductItemProps) => {
  return (
    <section className="product-item">
      <img className="product-item-image" src={image} alt={title} />
      <Heading component="h3">{title}</Heading>
      <p className="product-item-description">{description}</p>
      <p className="product-item-price">R$ {price}</p>
    </section>
  );
};
