import React from 'react';
import './CarouselCard.css';

interface CarouselCardProps {
  image: string;
  title: string;
  description: string;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className="carousel-card">
      <div className="carousel-card-image-container">
        <img src={image} alt={title} className="carousel-card-image" />
      </div>
      <div className="carousel-card-content">
        <h3 className="carousel-card-title">{title}</h3>
        <p className="carousel-card-description">{description}</p>
      </div>
    </div>
  );
};

export default CarouselCard;
