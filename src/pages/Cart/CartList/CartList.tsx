import { NavLink, useOutletContext } from "react-router";
import type { ProductLayoutContext } from "../../../components/Layouts/ProductLayout/ProductLayout";
import { Minus, Plus } from "lucide-react";
import { Button } from "../../../components";
import { access } from "fs";

const mockCartItems = [
  {
    id: 2,
    name: "Bráz",
    size: ["LARGE"],
    category: "pizza",
    description:
      "Fatias de abobrinha dourada em alho e azeite de oliva sobre base de muçarela especial, gratinada com lascas de parmesão argentino e finalizada com alecrim fresco. Homenagem à Bráz Pizzaria.",
    image: "https://cdn.accon.app/16057285531372731965683438782-1080p.jpg",
    value: 99,
  },

  {
    id: 14,
    name: "Ibérica",
    size: ["LARGE"],
    category: "pizza",
    description:
      "Jamón serrano espanhol, lascas de parmesão argentino, Catupiry® e champignon sobre base de muçarela especial. Leva tomate em cubos na saída do forno.",
    image: "https://cdn.accon.app/16057289995918277376069242095-1080p.jpg",
    value: 134,
  },
];

const delveryFee = 5.9;

const Size = {
  SMALL: " Pequena - 4 fatias",
  MEDIUM: "Média - 6 fatias",
  LARGE: "Grande - 8 fatias",
} as const;

const formattedValue = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

function CartList() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<ProductLayoutContext>();
  setTitle("Sacola");
  setNavigationHistory("/menu");

  return (
    <article className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div>
        {mockCartItems.map((item) => (
          <section key={item.id} className="flex items-center gap-2 mb-6">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 rounded-md object-cover"
            />
            <div className="flex-1">
              <h2 className="font-bold text-typography-dark">{item.name}</h2>
              <p className="text-sm text-typography-base">
                {Size[item.size[0] as keyof typeof Size]}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="bg-brand-primary text-common-light disabled:bg-interface-base disabled:text-typography-dark rounded-full p-1"
                disabled
              >
                <Minus className="size-4" />
              </button>
              <span className="text-typography-dark">{item.value}</span>
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
                {formattedValue(
                  mockCartItems[0].value + mockCartItems[1].value,
                )}
              </span>
            </li>
            <li className="flex mb-2">
              Taxa de entrega
              <span className="text-right flex-1">
                {formattedValue(delveryFee)}
              </span>
            </li>
            <li className="text-typography-darkest font-bold flex mb-2">
              Total
              <span className="text-right flex-1">
                {/* {formattedValue(
                  mockCartItems[0].value + mockCartItems[1].value + delveryFee,
                )} */}
                {mockCartItems.reduce((acc, value) => acc + value + delveryFee)}
              </span>
            </li>
          </ul>
        </div>
        <Button
          fullWidth
          onClick={() => console.log("Ir para checkout")}
          variant="primary"
        >
          Ir para o pagamento
        </Button>
      </div>
    </article>
  );
}

export default CartList;
