import { ChevronDown } from "lucide-react";
import "./User.css";

interface UserProps {
  userName: String;
}

interface UserAdressProps {
  userAdress: String;
}

export const User = ({ userName }: UserProps) => {
  return (
    <div className="greeting-user">
      <p>Olá, {userName}</p>
      <a href="">Ver meus pontos</a>
    </div>
  );
};

export const UserAdress = ({ userAdress }: UserAdressProps) => {
  return (
    <div className="delivery-address">
      <span className="delivery-text">Entregando no endereço:</span>
      <span className="user-adress">{userAdress}</span>
      <button id="change-address">
        <ChevronDown className="icon" />
        <span>Alterar</span>
      </button>
    </div>
  );
};
