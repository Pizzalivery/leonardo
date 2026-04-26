import { useOutletContext, useParams } from "react-router";

function OrderDetails() {
  const params = useParams();
  const { setTitle, setNavigationHistory } = useOutletContext();

  setTitle("Detalhes do Pedido");
  setNavigationHistory("/orders");

  console.log(params);

  return (
    <article className="container">
      <p>Detalhes do pedido: {params.orderId}</p>
    </article>
  );
}

export default OrderDetails;
