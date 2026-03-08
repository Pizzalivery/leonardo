import "./MostWanted.css";
import "/src/styles/style.css";
import { ProductCard, ProductCardTitle } from "../ProductCard/ProductCard";

interface MostWantedProps {
  children: React.ReactNode;
}

export const MostWanted = ({children}: MostWantedProps) => {
  return (
    <article className="most-wanted">


      <ProductCardTitle sectionTitle="As mais desejadas" />

      <div className="most-wanted-wrapper">
        <section className="most-wanted-item">
          <ProductCard
            image="/src/assets/160572915436349060139189700225-1080p.jpg"
            title="Margherita"
            description="Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado."
            price="R$ 93,00"
          />
        </section>
        <section className="most-wanted-item">
          <ProductCard
            image="/src/assets/16057285666390640459715899877-1080p.jpg"
            title="Calabresa"
            description="Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas."
            price="R$ 93,00"
          />
        </section>
        <section className="most-wanted-item">
          <ProductCard
            image="/src/assets/160572872237340571510501432084-1080p.jpg"
            title="Calacheese"
            description="Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial."
            price="R$ 99,00"
          />
        </section>
      </div>
      {children}
    </article>
  );
};