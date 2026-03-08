import "./Promotions.css";

const promotions = [
  {
    id: 1,
    title: "Pizza em dobro",
    description: "Compre uma pizza e ganhe outra",
    image: "/src/assets/depositphotos_15951851-stock-photo-fresh-pizza.webp",
    alt: "Duas pizzas em cima de uma mesa"
  },
  {
    id: 2,
    title: "Pizza de Calabresa + Coca",
    description: "Pizza + Coca-Cola as Quintas",
    image: "/src/assets/pizza_coca_cola.png",
    alt: "Pizza de Calabresa + Coca-Cola em cima de uma mesa"
  },
  {
    id: 3,
    title: "Quarta: Pizza + Sobremesa",
    description: "As quartas compre uma pizza e leve a sobremesa de graça",
    image: "/src/assets/pizza_sobremesa.png",
    alt: "Pizza + Sobremesa em cima de uma mesa"
  },
  {
    id: 4,
    title: "Pizza em dobro",
    description: "Compre uma pizza e ganhe outra",
    image: "/src/assets/depositphotos_15951851-stock-photo-fresh-pizza.webp",
    alt: "Duas pizzas em cima de uma mesa"
  },
  {
    id: 5,
    title: "Pizza de Calabresa + Coca",
    description: "Pizza + Coca-Cola as Quintas",
    image: "/src/assets/pizza_coca_cola.png",
    alt: "Pizza de Calabresa + Coca-Cola em cima de uma mesa"
  },
  {
    id: 6,
    title: "Quarta: Pizza + Sobremesa",
    description: "As quartas compre uma pizza e leve a sobremesa de graça",
    image: "/src/assets/pizza_sobremesa.png",
    alt: "Pizza + Sobremesa em cima de uma mesa"
  },
  {
    id: 7,
    title: "Pizza em dobro",
    description: "Compre uma pizza e ganhe outra",
    image: "/src/assets/depositphotos_15951851-stock-photo-fresh-pizza.webp",
    alt: "Duas pizzas em cima de uma mesa"
  },
  {
    id: 8,
    title: "Pizza de Calabresa + Coca",
    description: "Pizza + Coca-Cola as Quintas",
    image: "/src/assets/pizza_coca_cola.png",
    alt: "Pizza de Calabresa + Coca-Cola em cima de uma mesa"
  },
  {
    id: 9,
    title: "Quarta: Pizza + Sobremesa",
    description: "As quartas compre uma pizza e leve a sobremesa de graça",
    image: "/src/assets/pizza_sobremesa.png",
    alt: "Pizza + Sobremesa em cima de uma mesa"
  },
  {
    id: 10,
    title: "Pizza em dobro",
    description: "Compre uma pizza e ganhe outra",
    image: "/src/assets/depositphotos_15951851-stock-photo-fresh-pizza.webp",
    alt: "Duas pizzas em cima de uma mesa"
  },
  {
    id: 11,
    title: "Pizza de Calabresa + Coca",
    description: "Pizza + Coca-Cola as Quintas",
    image: "/src/assets/pizza_coca_cola.png",
    alt: "Pizza de Calabresa + Coca-Cola em cima de uma mesa"
  },
  {
    id: 12,
    title: "Quarta: Pizza + Sobremesa",
    description: "As quartas compre uma pizza e leve a sobremesa de graça",
    image: "/src/assets/pizza_sobremesa.png",
    alt: "Pizza + Sobremesa em cima de uma mesa"
  }
];

export default function Promotions() {
  return (
    <section className="offers">
      <div className="container">
        <h2 className="section-title">Promoções</h2>
      </div>
      <div className="carousel">
        {promotions.map((promo) => (
          <div key={promo.id} className="carousel-item">
            <img src={promo.image} alt={promo.alt} />
            <h3 className="carousel-item-title">{promo.title}</h3>
            <p className="carousel-item-description">{promo.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
