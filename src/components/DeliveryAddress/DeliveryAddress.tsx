import { ChevronDown, MapPin } from "lucide-react";
import "./DeliveryAddress.css";
import { useNavigate } from "react-router";

interface DeliveryAddressProps {
  address: string;
  onClick: () => void;
}





export const DeliveryAddress = ({ address, onClick }: DeliveryAddressProps) => {
  const navigate = useNavigate();
if (!address) {
  return (
    <div className="delivery-address" style={{ display: "flex", justifyContent: "center" }}>
      <button
        id="change-address"
        onClick={() => navigate("/register/cep")}
        style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}>
        <MapPin size={12} />
        <span style={{ display: "inline" }}>Adicionar endereço</span>
      </button>
    </div>
  );
}



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