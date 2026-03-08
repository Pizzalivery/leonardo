import "./Favorites.css";

export default function Favorites() {
  return (
    <article className="most-wanted">
      <h2 className="section-title">As mais desejadas</h2>
      <div className="most-wanted-wrapper">
        <section className="most-wanted-item">
          <img
            className="product-image"
            src="/src/assets/160572915436349060139189700225-1080p.jpg"
            alt="Pizza Margherita"
          />
          <h3 className="product-title">Margherita</h3>
          <p className="product-description">
            Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de
            manjericão orgânico e um fio de azeite aromatizado.
          </p>
          <p className="product-price">R$ 93,00</p>
        </section>
        <section className="most-wanted-item">
          <img
            className="product-image"
            src="/src/assets/16057285666390640459715899877-1080p.jpg"
            alt="Pizza Calabresa"
          />
          <h3 className="product-title">Calabresa</h3>
          <p className="product-description">
            Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas.
          </p>
          <p className="product-price">R$ 93,00</p>
        </section>
        <section className="most-wanted-item">
          <img
            className="product-image"
            src="/src/assets/160572872237340571510501432084-1080p.jpg"
            alt="Pizza Calacheese"
          />
          <h3 className="product-title">Calacheese</h3>
          <p className="product-description">
            Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial.
          </p>
          <p className="product-price">R$ 99,00</p>
        </section>
      </div>
    </article>
  );
}
