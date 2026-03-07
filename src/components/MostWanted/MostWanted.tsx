import "./MostWanted.css";

interface MostWantedProps {
  children: React.ReactNode;
}

interface MostWantedItemProps {
  title: string;
  price: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}


export function MostWanted({ children }: MostWantedProps) {
  return (
    <article className="most-wanted">
      <h2 className="section-title">As mais desejadas</h2>

      <div className="most-wanted-wrapper">
        {children}
      </div>
    </article>
  );
}

export function MostWantedItem({
  title,
  price,
  description,
  image,
}: MostWantedItemProps) {
  return (
    <section className="most-wanted-item">
      <img className="product-image" src={image.src} alt={image.alt} />
      <h3 className="product-title">{title}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">{price}</p>
    </section>
  );
}