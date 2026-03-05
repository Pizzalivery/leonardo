import { useParams } from "react-router";

function OrderDetails() {
  const params = useParams();

  console.log(params);

  return (
    <>
      <h1>Order Details</h1>
      <p>Detalhes do pedido: {params.orderId}</p>
    </>
  );
}

export default OrderDetails;
