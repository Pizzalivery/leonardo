import { ChevronDown, MapPin } from "lucide-react";
import "./DeliveryAddress.css";
import { useNavigate } from "react-router";

interface DeliveryAddressProps {
  address: string;
  onClick: () => void;
}

export const DeliveryAddress = ({ address, onClick }: DeliveryAddressProps) => {
  const navigate = useNavigate();

  return (
    <div className="delivery-address">
      {!address ? (
        <button id="change-address" onClick={() => navigate("/register/cep")}>
          <MapPin size={12}/>
          <span>Adicionar endereço</span>
        </button>
      ) : (
        <span className="delivery-text">
          <span>Entregando no endereço:</span>
          {address}
          <button id="change-address" onClick={onClick}>
            <ChevronDown />
            <span>Alterar</span>
          </button>
        </span>
      )}
    </div>
  );
};