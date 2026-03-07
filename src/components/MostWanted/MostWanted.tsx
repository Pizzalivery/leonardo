import "./MostWanted.css";

type MostWantedItemProps = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  price: string;
};

type MostWantedProps = {
  items: MostWantedItemProps[];
};

function MostWantedItem({
  image,
  title,
  description,
  price,
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

function MostWanted({ items }: MostWantedProps) {
  return (
    <article className="most-wanted">
      <h2 className="section-title">As mais desejadas</h2>

      <div className="most-wanted-wrapper">
        {items.map((item) => (
          <MostWantedItem
            key={item.title}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </article>
  );
}

export default MostWanted;