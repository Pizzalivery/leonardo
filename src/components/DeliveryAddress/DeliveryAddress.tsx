import { ChevronDown } from "lucide-react";
import "./DeliveryAddress.css";

interface DeliveryAddressProps {
  address: string;
  onClick: () => void;
}

export const DeliveryAddress = ({ address, onClick }: DeliveryAddressProps) => {
  return (
    <div className="delivery-address">
      <span className="delivery-text">
        <span>Entregando no endereço:</span>
        {address}
        <button id="change-address" onClick={onClick}>
          <ChevronDown />
          <span>Alterar</span>
        </button>
      </span>
    </div>
  );
};
