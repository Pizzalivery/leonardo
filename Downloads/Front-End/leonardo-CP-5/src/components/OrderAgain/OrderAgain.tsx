import { NavLink } from "react-router";
import { Heading } from "../Heading/Heading";
// import "./OrderAgain.css"
import Style from "./OrderAgain.module.css";

interface OrderAgainProps {
  title: string;
  name: string;
  price: string;
  image: string;
}

export const OrderAgain = ({ title, name, price, image }: OrderAgainProps) => {
  return (
    <section className={Style["order-again"]}>
      <Heading component="h2">{title}</Heading>
      <img className={Style["order-again-img"]} src={image} alt={name} />

      <p className={Style["order-again-title"]}>{name}</p>
      <p className={Style["order-again-price"]}>{price}</p>
      <NavLink className={Style.add} to={"/cart"}>
        Adicionar a sacola
      </NavLink>
    </section>
  );
};
