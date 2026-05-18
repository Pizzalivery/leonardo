import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router";
import type { ProductLayoutContext } from "../../components/Layouts/ProductLayout/ProductLayout";

function OrderDetails() {
  const params = useParams();
  const { setTitle, setNavigationHistory } =
    useOutletContext<ProductLayoutContext>();

  useEffect(() => {
    setTitle("Detalhes do Pedido");
    setNavigationHistory("/orders");
  }, []);

  return (
    <article className="container">
      <p>Detalhes do pedido: {params.orderId}</p>
    </article>
  );
}

export default OrderDetails;
