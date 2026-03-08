import React from 'react';
import './PromoCard.css';

interface PromoProps {
  image: string;
  title: string;
  description: string;
}

const PromoCard: React.FC<PromoProps> = ({ image, title, description }) => {
  return (
    <div className="promo-card">
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};