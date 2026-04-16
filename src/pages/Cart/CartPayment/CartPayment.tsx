import { useNavigate, useOutletContext } from "react-router";
import type { ProductLayoutContext } from "../../../components/Layouts/ProductLayout/ProductLayout";
import { Button, Card, Heading } from "../../../components";
import { useContext } from "react";
import type { OrderContextProps } from "../../../types";
import { OrderContext } from "../../../context/OrderContext";

function CartPayment() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<ProductLayoutContext>();

  const navigate = useNavigate();

  const { orders, totalValue, delveryFee } =
    useContext<OrderContextProps>(OrderContext);

  setTitle("Pagamento");
  setNavigationHistory("/cart");

  return (
    <>
      <article className="px-5 grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
        <div>
          <section className="mb-4">
            <Heading component="h2">Endereço de entrega</Heading>
          </section>
          <section className="mb-4">
            <Heading component="h2">Forma de Pagamento</Heading>
          </section>
          <section>
            <Heading component="h2">Resumo do pedido</Heading>
            <Card>
              <ul className="text-md text-typography-light">
                <li className="flex justify-between mb-2">
                  Produtos (0)
                  <span>0</span>
                </li>
                <li className="flex justify-between mb-2">
                  Taxa de entrega
                  <span>0</span>
                </li>
                <li className="flex justify-between mb-2">
                  Desconto (pontos)
                  <span>0</span>
                </li>
              </ul>
              <hr className="text-interface-base" />
              <p className="flex justify-between font-bold text-lg text-typography-dark mt-2">
                Total <span>0</span>
              </p>
            </Card>
          </section>
        </div>
        <div>
          <div className="py-4">
            <Button fullWidth onClick={() => {}} variant="primary">
              "Realizar pedido"
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}

export default CartPayment;
