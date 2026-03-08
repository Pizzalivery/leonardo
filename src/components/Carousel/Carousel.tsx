import "./Carousel.css";
import "/src//styles/style.css";

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
      <div className="container">
        <h2 className="section-title">Promoções</h2>
      </div>
      <div className="carousel">
          {children}
      </div>
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