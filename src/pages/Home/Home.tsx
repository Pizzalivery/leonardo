import { useState } from "react";

import { Navigation } from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import Offers from "../../components/Offers/Offers";
import OrderAgain from "../../components/OrderAgain/OrderAgain";
import MostWanted from "../../components/MostWanted/MostWanted";
import Footer from "../../components/Footer/Footer";
import AddressDialog from "../../components/AddressDialog/AddressDialog";

function Home() {
  /* O estado do dialog fica na página para permitir que o Header dispare a abertura
     e o AddressDialog controle o fechamento sem acoplamento direto entre os componentes. */
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  function handleOpenAddressDialog() {
    setIsAddressDialogOpen(true);
  }

  function handleCloseAddressDialog() {
    setIsAddressDialogOpen(false);
  }

  return (
    <>
      <Navigation />
      <Header onOpenAddressDialog={handleOpenAddressDialog} />
      <Offers />
      <OrderAgain />
      <MostWanted />
      <Footer />

      <AddressDialog
        isOpen={isAddressDialogOpen}
        onClose={handleCloseAddressDialog}
      />
    </>
  );
}

export default Home;