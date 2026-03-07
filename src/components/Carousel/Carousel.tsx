import "./Carousel.css";

interface CarouselProps {
  children: React.ReactNode;
}

export interface CarouselItemProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export const Carousel = ({ children }: CarouselProps) => {
  return (
  <section className="offers">
    <div className="carousel">{children}</div>
  </section>  
);
};

export const CarouselItem = ({
  title,
  description,
  image,
}: CarouselItemProps) => {
  return (
    <div className="carousel-item">
      <img src={image.src} alt={image.alt} />
      <h3 className="carousel-item-title">{title}</h3>
      <p className="carousel-item-description">{description}</p>
    </div>
  );
};
