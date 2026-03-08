import pizzaEmDobroImg from "../../assets/depositphotos_15951851-stock-photo-fresh-pizza.webp";
import pizzaCocaImg from "../../assets/pizza_coca_cola.png";
import pizzaSobremesaImg from "../../assets/pizza_sobremesa.png";

import { Carousel, CarouselItem } from "../Carousel/Carousel";

import "./Offers.css";

const offers = [
  {
    id: 1,
    title: "Pizza em dobro",
    description: "Compre uma pizza e ganhe outra",
    image: {
      src: pizzaEmDobroImg,
      alt: "Duas pizzas em cima de uma mesa",
    },
  },
  {
    id: 2,
    title: "Pizza de Calabresa + Coca",
    description: "Pizza + Coca-Cola as Quintas",
    image: {
      src: pizzaCocaImg,
      alt: "Pizza de Calabresa + Coca-Cola em cima de uma mesa",
    },
  },
  {
    id: 3,
    title: "Quarta: Pizza + Sobremesa",
    description: "As quartas compre uma pizza e leve a sobremesa de graça",
    image: {
      src: pizzaSobremesaImg,
      alt: "Pizza + Sobremesa em cima de uma mesa",
    },
  },
  {
    id: 4,
    title: "Pizza em dobro",
    description: "Compre uma pizza e ganhe outra",
    image: {
      src: pizzaEmDobroImg,
      alt: "Duas pizzas em cima de uma mesa",
    },
  },
  {
    id: 5,
    title: "Pizza de Calabresa + Coca",
    description: "Pizza + Coca-Cola as Quintas",
    image: {
      src: pizzaCocaImg,
      alt: "Pizza de Calabresa + Coca-Cola em cima de uma mesa",
    },
  },
  {
    id: 6,
    title: "Quarta: Pizza + Sobremesa",
    description: "As quartas compre uma pizza e leve a sobremesa de graça",
    image: {
      src: pizzaSobremesaImg,
      alt: "Pizza + Sobremesa em cima de uma mesa",
    },
  },
  {
    id: 7,
    title: "Pizza em dobro",
    description: "Compre uma pizza e ganhe outra",
    image: {
      src: pizzaEmDobroImg,
      alt: "Duas pizzas em cima de uma mesa",
    },
  },
  {
    id: 8,
    title: "Pizza de Calabresa + Coca",
    description: "Pizza + Coca-Cola as Quintas",
    image: {
      src: pizzaCocaImg,
      alt: "Pizza de Calabresa + Coca-Cola em cima de uma mesa",
    },
  },
  {
    id: 9,
    title: "Quarta: Pizza + Sobremesa",
    description: "As quartas compre uma pizza e leve a sobremesa de graça",
    image: {
      src: pizzaSobremesaImg,
      alt: "Pizza + Sobremesa em cima de uma mesa",
    },
  },
  {
    id: 10,
    title: "Pizza em dobro",
    description: "Compre uma pizza e ganhe outra",
    image: {
      src: pizzaEmDobroImg,
      alt: "Duas pizzas em cima de uma mesa",
    },
  },
  {
    id: 11,
    title: "Pizza de Calabresa + Coca",
    description: "Pizza + Coca-Cola as Quintas",
    image: {
      src: pizzaCocaImg,
      alt: "Pizza de Calabresa + Coca-Cola em cima de uma mesa",
    },
  },
  {
    id: 12,
    title: "Quarta: Pizza + Sobremesa",
    description: "As quartas compre uma pizza e leve a sobremesa de graça",
    image: {
      src: pizzaSobremesaImg,
      alt: "Pizza + Sobremesa em cima de uma mesa",
    },
  },
];

function Offers() {
  return (
    <section className="offers">
      <div className="container">
        <h2 className="section-title">Promoções</h2>
      </div>

      <Carousel>
        {offers.map((offer) => (
          <CarouselItem
            key={offer.id}
            title={offer.title}
            description={offer.description}
            image={offer.image}
          />
        ))}
      </Carousel>
    </section>
  );
}

export default Offers;