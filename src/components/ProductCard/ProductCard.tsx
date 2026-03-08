import "./ProductCard.css";

interface ProductCardProps {
  image?: string;
  title?: string;
  description?: string;
  price?: string;
}

interface ProductCardTitleProps {
  sectionTitle?: string;
}

export const ProductCard = ({
  image,
  title,
  description,
  price,
}: ProductCardProps) => {
  return (<>
      <div className="product-card">
        <img src={image} alt={title} className="product-image" />
        <h3 className="product-title">{title}</h3>
        {description && (<p className="product-description">{description}</p>)}
        <p className="product-price">{price}</p>
      </div>
    </>
  );
};

export const ProductCardTitle = ({
  sectionTitle,
}: ProductCardTitleProps) => {
  return (
    <>
      <h2 className="section-title">{sectionTitle}</h2>
    </>
  );
};