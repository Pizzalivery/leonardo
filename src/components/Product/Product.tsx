import "./Product.css";

interface ProductProps {
  image?: string;
  title?: string;
  description?: string;
  price?: string;
}

interface ProductTitleProps {
  sectionTitle?: string;
}

export const Product = ({
  image,
  title,
  description,
  price,
}: ProductProps) => {
  return (<>
      <div className="product">
        <img src={image} alt={title} className="product-image" />
        <h3 className="product-title">{title}</h3>
        {description && (<p className="product-description">{description}</p>)}
        <p className="product-price">{price}</p>
      </div>
    </>
  );
};

export const ProductTitle = ({
  sectionTitle,
}: ProductTitleProps) => {
  return (
    <>
      <h2 className="section-title">{sectionTitle}</h2>
    </>
  );
};