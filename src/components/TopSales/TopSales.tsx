import "./TopSales.css";

export interface TopSalesProps {
  children: React.ReactNode;
}

export interface TopSalesItemProps {
  name: string;
  img: string;
  description: string;
  price: string;
}

export const TopSales = ({ children }: TopSalesProps) => {
  return (
    <article className="most-wanted">
      <h2 className="section-title">As mais desejadas</h2>
      <div className="most-wanted-wrapper">{children}</div>
    </article>
  );
};

export const TopSalesItem = ({
  name,
  img,
  description,
  price,
}: TopSalesItemProps) => {
  return (
    <section className="most-wanted-item">
      <img className="product-image" src={img} alt={name} />
      <h3 className="product-title">{name}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">{price}</p>
    </section>
  );
};
