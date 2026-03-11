import { NavLink } from "react-router";
import { Heading } from "../Heading/Heading";
import "./OrderAgain.css";

interface OrderAgainProps {
  title: string;
  name: string;
  price: string;
  image: string;
}

export const OrderAgain = ({ title, name, price, image }: OrderAgainProps) => {
  return (
    <section className="order-again">
      <Heading component="h2">{title}</Heading>
      <img className="order-again-img" src={image} alt={name} />

      <p className="order-again-title">{name}</p>
      <p className="order-again-price">{price}</p>
      <NavLink className="order-again-add" to={"/cart"}>
        Adicionar a sacola
      </NavLink>
    </section>
  );
};
