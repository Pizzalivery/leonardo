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

export const TopSales = ({ children }: TopSalesProps) => (
  <section className="most-wanted">
    <h2 className="section-title">As mais desejadas</h2>
    <div className="most-wanted-wrapper">
      {children}
    </div>
  </section>
);

export const TopSalesItem = ({ name, img, description, price }: TopSalesItemProps) => (
  <article className="most-wanted-item">
    <img src={img} alt={name} className="product-image" />
    
    <h3 className="product-title">{name}</h3>
    <p className="product-description">{description}</p>
    <p className="product-price">{price}</p>
  </article>
);