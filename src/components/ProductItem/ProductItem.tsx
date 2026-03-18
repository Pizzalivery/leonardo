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
      <img
        className="w-34.5 h-34.5 rounded-xl mr-3 float-left"
        src={image}
        alt={title}
      />
      <Heading component="h3">{title}</Heading>
      <p className="text-xs font-medium mb-2">{description}</p>
      <p className="text-base font-extrabold mb-2 text-brand-primary">
        R$ {price}
      </p>
    </section>
  );
};
