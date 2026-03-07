import "./Offers.css";

type OffersProps = {
  children: React.ReactNode;
};

function Offers({ children }: OffersProps) {
  return (
    <section className="offers">
      <div className="container">
        <h2 className="offers-title">Promoções</h2>
      </div>

      {children}
    </section>
  );
}

export default Offers;