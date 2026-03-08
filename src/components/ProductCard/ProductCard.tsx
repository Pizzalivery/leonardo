import "./ProductCard.css";

interface ProductCardProps {
  title: string;
  description?: string;
  price: number;
  image: string;
  variant?: "horizontal" | "vertical";
}

export const ProductCard = ({ title, description, price, image, variant = "horizontal" }: ProductCardProps) => {
  return (
    <div className={`product-card ${variant}`}>
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        {description && <p className="product-description">{description}</p>}
        <p className="product-price">R$ {price.toFixed(2).replace(".", ",")}</p>
        <button className="add-to-cart">Adicionar a sacola</button>
      </div>
    </div>
  );
};
