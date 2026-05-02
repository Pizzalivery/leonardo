import { NavLink, useNavigate, useOutletContext } from "react-router";
import type { ProductLayoutContext } from "../../../components/Layouts/ProductLayout/ProductLayout";
import { Minus, Plus } from "lucide-react";
import { Button } from "../../../components";
import { OrderContext } from "../../../context/OrderContext";
import { useContext, useLayoutEffect } from "react";
import type { OrderContextProps, OrderItem } from "../../../types";
import { formatCurrency } from "../../../utils/numberFormat";

const Size = {
  SMALL: "Pequena - 4 fatias",
  MEDIUM: "Média - 6 fatias",
  LARGE: "Grande - 8 fatias",
} as const;

type SizeKey = keyof typeof Size;

function CartList() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<ProductLayoutContext>();

  const navigate = useNavigate();

  const { orders, totalValue, delveryFee } =
    useContext<OrderContextProps>(OrderContext);

  const handleNextStep = () => {
    navigate("/payment");
  };

  useLayoutEffect(() => {
    setNavigationHistory("/cart");
    setTitle("Sacola");
  }, []);

  return (
    <article className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)] px-5">
      <div>
        {orders.map((item: OrderItem) => (
          <section key={item.id} className="flex items-center gap-2 mb-6">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 rounded-md object-cover"
            />
            <div className="flex-1">
              <h2 className="font-bold text-typography-dark">{item.name}</h2>
              <p className="text-sm text-typography-base">
                {Size[item.size as SizeKey]}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="bg-brand-primary text-common-light disabled:bg-interface-base disabled:text-typography-dark rounded-full p-1"
                disabled
              >
                <Minus className="size-4" />
              </button>
              <span className="text-typography-dark">{1}</span>
              <button className="bg-brand-primary text-common-light rounded-full p-1">
                <Plus className="size-4" />
              </button>
            </div>
          </section>
        ))}

        <NavLink
          className="w-full block text-sm font-bold text-center text-brand-primary"
          to={"/menu"}
        >
          Adicionar mais itens
        </NavLink>
      </div>
      <div>
        <div className="py-4 border-t border-interface-border">
          <h3 className="text-lg font-bold mb-3">Resumo do pedido</h3>
          <ul className="text-typography-base">
            <li className="flex mb-2">
              Subtotal
              <span className="text-right flex-1">
                {formatCurrency(totalValue)}
              </span>
            </li>
            <li className="flex mb-2">
              Taxa de entrega
              <span className="text-right flex-1">
                {formatCurrency(delveryFee)}
              </span>
            </li>
            <li className="text-typography-darkest font-bold flex mb-2">
              Total
              <span className="text-right flex-1">
                {formatCurrency(totalValue + delveryFee)}
              </span>
            </li>
          </ul>
        </div>
        <Button fullWidth onClick={handleNextStep} variant="primary">
          Ir para o pagamento
        </Button>
      </div>
    </article>
  );
}

export default CartList;
