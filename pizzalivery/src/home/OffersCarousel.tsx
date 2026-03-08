import "./OffersCarousel.css";
import SectionTitle from "../components/SectionTitle";
import CarouselItem from "../components/CarouselItem";

function OffersCarousel() {
  return (
    <section className="offers">
      <div className="container">
        <SectionTitle title="Promoções" />
      </div>

      <div className="carousel">
        <CarouselItem
          image="/images/depositphotos_15951851-stock-photo-fresh-pizza.webp"
          alt="Duas pizzas em cima de uma mesa"
          title="Pizza em dobro"
          description="Compre uma pizza e ganhe outra"
        />
        <CarouselItem
          image="/images/pizza_coca_cola.png"
          alt="Pizza de Calabresa com Coca-Cola"
          title="Pizza de Calabresa + Coca"
          description="Pizza + Coca-Cola às quintas"
        />
        <CarouselItem
          image="/images/pizza_sobremesa.png"
          alt="Pizza com sobremesa em cima de uma mesa"
          title="Quarta: Pizza + Sobremesa"
          description="Às quartas compre uma pizza e leve a sobremesa de graça"
        />
        <CarouselItem
          image="/images/depositphotos_15951851-stock-photo-fresh-pizza.webp"
          alt="Duas pizzas em cima de uma mesa"
          title="Pizza em dobro"
          description="Compre uma pizza e ganhe outra"
        />
        <CarouselItem
          image="/images/pizza_coca_cola.png"
          alt="Pizza de Calabresa com Coca-Cola"
          title="Pizza de Calabresa + Coca"
          description="Pizza + Coca-Cola às quintas"
        />
        <CarouselItem
          image="/images/pizza_sobremesa.png"
          alt="Pizza com sobremesa em cima de uma mesa"
          title="Quarta: Pizza + Sobremesa"
          description="Às quartas compre uma pizza e leve a sobremesa de graça"
        />
      </div>
    </section>
  );
}

export default OffersCarousel;