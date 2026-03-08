import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";

function MostWanted() {
  return (
    <article className="most-wanted">
      <SectionTitle title="As mais desejadas" />

      <div className="most-wanted-wrapper">
        <ProductCard
          image="/images/160572915436349060139189700225-1080p.jpg"
          alt="Pizza Margherita"
          title="Margherita"
          description="Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado."
          price="R$ 93,00"
        />

        <ProductCard
          image="/images/16057285666390640459715899877-1080p.jpg"
          alt="Pizza Calabresa"
          title="Calabresa"
          description="Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas."
          price="R$ 93,00"
        />

        <ProductCard
          image="/images/160572872237340571510501432084-1080p.jpg"
          alt="Pizza Calacheese"
          title="Calacheese"
          description="Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial."
          price="R$ 99,00"
        />
      </div>
    </article>
  );
}

export default MostWanted;