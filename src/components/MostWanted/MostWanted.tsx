import "./MostWanted.css";
import "/src/styles/style.css";
import { ProductTitle } from "../Product/Product";

interface MostWantedProps {
  children: React.ReactNode;
}

export interface MostWantedItemProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  price: number;
}

export const MostWanted = ({ children }: MostWantedProps) => {
  return (
    <article className="most-wanted">
      <ProductTitle sectionTitle="As mais desejadas" />

      <div className="most-wanted-wrapper">
        {children}
      </div>
    </article>
  );
};

export const MostWantedItem = ({
  image,
  title,
  description,
  price,
}: MostWantedItemProps) => {
  return (
    <section className="most-wanted-item">
      <img
        className="product-image"
        src={image.src}
        alt={image.alt}
      />

      <h3 className="product-title">{title}</h3>

      <p className="product-description">{description}</p>

      <p className="product-price">
        R$ {price.toFixed(2)}
      </p>
    </section>
  );
};