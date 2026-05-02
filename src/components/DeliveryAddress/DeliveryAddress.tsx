import { ChevronDown } from "lucide-react";
import "./DeliveryAddress.css";
import type { Address } from "../../types";

interface DeliveryAddressProps {
  address: Address | null;
  onClick: () => void;
}

export const DeliveryAddress = ({ address, onClick }: DeliveryAddressProps) => {
  return (
    <div className="delivery-address">
      <span className="delivery-text">
        <span>Entregando no endereço:</span>
        {address?.street}, {address?.number}
        <button id="change-address" onClick={onClick}>
          <ChevronDown />
          <span>Alterar</span>
        </button>
      </span>
    </div>
  );
};
