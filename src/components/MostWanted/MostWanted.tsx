import margheritaImg from "../../assets/160572915436349060139189700225-1080p.jpg";
import calabresaImg from "../../assets/16057285666390640459715899877-1080p.jpg";
import calacheeseImg from "../../assets/160572872237340571510501432084-1080p.jpg";

import "./MostWanted.css";

import ProductCard from "../ProductCard/ProductCard";

/* A lista fica isolada da marcação para facilitar manutenção dos itens
   e reaproveitar o ProductCard sem duplicar estrutura de HTML. */
const mostWantedItems = [
  {
    id: 1,
    image: margheritaImg,
    alt: "Pizza Margherita",
    title: "Margherita",
    description:
      "Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado.",
    price: "R$ 93,00",
  },
  {
    id: 2,
    image: calabresaImg,
    alt: "Pizza Calabresa",
    title: "Calabresa",
    description:
      "Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas.",
    price: "R$ 93,00",
  },
  {
    id: 3,
    image: calacheeseImg,
    alt: "Pizza Calacheese",
    title: "Calacheese",
    description:
      "Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial.",
    price: "R$ 99,00",
  },
];

function MostWanted() {
  return (
    <article className="most-wanted">
      <h2 className="section-title">As mais desejadas</h2>

      <div className="most-wanted-wrapper">
        {mostWantedItems.map((item) => (
          <ProductCard
            key={item.id}
            image={item.image}
            alt={item.alt}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </article>
  );
}

export default MostWanted;