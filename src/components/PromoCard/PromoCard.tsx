import "./PromoCard.css";

interface PromoCardProps {
  title: string;
  description: string;
  image: string;
}

export const PromoCard = ({ title, description, image }: PromoCardProps) => {
  return (
    <div className="promo-card">
      <div className="promo-image-container">
        <img src={image} alt={title} className="promo-image" />
      </div>
      <div className="promo-content">
        <h3 className="promo-title">{title}</h3>
        <p className="promo-description">{description}</p>
      </div>
    </div>
  );
};
