import "./MostWanted.css";

interface MostWantedProps {
  children: React.ReactNode;
}

export interface MostWantedItemProps {
  title: string;
  description: string;
  price: string;
  image: {
    src: string;
    alt: string;
  };
}

export const MostWanted = ({ children }: MostWantedProps) => {
  return <article className="most-wanted">{children}</article>;
};

export const MostWantedItem = ({
  image,
  title,
  description,
  price,
}: MostWantedItemProps) => {
  return (
    <section className="most-wanted-item">
      <img className="product-image" src={image.src} alt={image.alt} />
      <h3 className="product-title">{title}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">R$ {price}</p>
    </section>
  );
};
