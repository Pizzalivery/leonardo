import Navigation from "../components/Navigation";
import Header from "../components/Header";
import OffersCarousel from "./OffersCarousel";
import OrderAgain from "./OrderAgain";

function Home() {
  return (
    <>
      <Navigation />
      <Header />

      <main>
        <OffersCarousel />
        <OrderAgain />
      </main>
    </>
  );
}

export default Home;