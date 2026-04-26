import { ChevronDown } from "lucide-react";
import "./DeliveryAddress.css";

interface DeliveryAddressProps {
  address: string;
  onClick: () => void;
  hidden?: boolean;
}

export const DeliveryAddress = ({
  address,
  onClick,
  hidden = false,
}: DeliveryAddressProps) => {
  return (
    <div className={`delivery-address ${hidden ? "delivery-address--hidden" : ""}`}>
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
