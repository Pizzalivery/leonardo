import "./Header.css";
import { ButtonAddress } from "../ButtonAddress/ButtonAddress";
import { Dialog } from "../Dialog/Dialog";
import { useState } from "react";

export const Header = () => {

const [isDialogOpen, setIsDialogOpen] = useState(false)

const handleOpenDialog = () => {
  setIsDialogOpen(true)
}

const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <header className="header">
      <div className="delivery-address">
        <span className="delivery-text">
          <span>Entregando no endereço: </span>Rua Mesquita, 248 <ButtonAddress onClick={handleOpenDialog}> Alterar</ButtonAddress>
        </span>
      </div>

      <div className="greeting-user">
        <p>Olá, Daniela</p>
        <a href="">Ver meus pontos</a>
      </div>

      <Dialog
        title="Alterar endereço de entrega"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />

    </header>
  );
};