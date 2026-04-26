import { useOutletContext, useParams } from "react-router";
import type { NavigationLayoutContext } from "../../components/Layouts/NavigationLayout/NavigationLayout";

function OrderDetails() {
  const params = useParams();
  const { setTitle, setNavigationHistory } = useOutletContext<NavigationLayoutContext>();

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
