import { Carousel, CarouselItem, type CarouselItemProps } from "../Carousel/Carousel";
import "./Offers.css";
import "./Chip.css";

interface OffersProps {
  offers: CarouselItemProps[];
}

export const Offers = ({ offers }: OffersProps) => {
  return (
    <section className="offers">
      <div className="container">
        <h2 className="section-title">Promoções</h2>
      </div>
      <Carousel>
        {offers.map((offer) => (
          <CarouselItem
            key={offer.image.src}
            title={offer.title}
            description={offer.description}
            image={offer.image}
          />
        ))}
      </Carousel>
    </section>
  );
};
