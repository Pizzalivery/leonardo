import { Link, NavLink, useNavigate, useOutletContext } from "react-router";
import { Heading } from "../../components/Heading/Heading";

function Orders() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext();

  setTitle("Pedidos");
  setNavigationHistory("/");

  const handleCkick = () => {
    navigate("/orders/1234");
  };

  return (
    <article className="container">
      <Heading component="h2">Histórico</Heading>
      <button onClick={handleCkick}>Ver pedido</button>
    </article>
  );
}

export default Orders;
