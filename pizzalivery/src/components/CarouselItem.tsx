import "./CarouselItem.css";

type CarouselItemProps = {
  image: string;
  alt: string;
  title: string;
  description: string;
};

function CarouselItem({
  image,
  alt,
  title,
  description,
}: CarouselItemProps) {
  return (
    <div className="carousel-item">
      <img src={image} alt={alt} />
      <h3 className="carousel-item-title">{title}</h3>
      <p className="carousel-item-description">{description}</p>
    </div>
  );
}

export default CarouselItem;