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
  return <div className="carousel">{children}</div>;
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

export const CarouselSkeleton = () => {
  return (
    <Carousel>
      {[1, 2, 3].map((index) => (
        <div key={index} className="carousel-item ">
          <div className="skeleton-image h-36 bg-gray-200 animate-pulse rounded-lg mb-2" />
          <div className="skeleton-title h-6 bg-gray-200 animate-pulse rounded-lg mb-1" />
          <div className="skeleton-description h-4 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      ))}
    </Carousel>
  );
};
