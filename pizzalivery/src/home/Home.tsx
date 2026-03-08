import { useState } from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddressDialog from "../components/AddressDialog";
import OffersCarousel from "./OffersCarousel";
import OrderAgain from "./OrderAgain";
import MostWanted from "./MostWanted";

function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Navigation />
      <Header onOpenAddress={() => setIsDialogOpen(true)} />

      <main>
        <OffersCarousel />
        <OrderAgain />
        <MostWanted />
      </main>

      <Footer />

      <AddressDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}

export default Home;