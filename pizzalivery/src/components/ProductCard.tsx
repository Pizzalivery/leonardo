import "./ProductCard.css";

type ProductCardProps = {
  image: string;
  alt: string;
  title: string;
  description: string;
  price: string;
};

function ProductCard({
  image,
  alt,
  title,
  description,
  price,
}: ProductCardProps) {
  return (
    <section className="most-wanted-item">
      <img className="product-image" src={image} alt={alt} />
      <h3 className="product-title">{title}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">{price}</p>
    </section>
  );
}

export default ProductCard;