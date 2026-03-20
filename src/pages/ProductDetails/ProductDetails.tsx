import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import type { ProductLayoutContext } from "../../components/Layouts/ProductLayout/ProductLayout";
import getPizzaDetails from "../../api/getPizzaDetails";
import { Button, Heading } from "../../components";

type PizzaDetails = {
  id: number;
  name: string;
  size: string[]; // Array<string>
  category: string;
  description: string;
  image: string;
  value: number;
};

function ProductDetails() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<ProductLayoutContext>();

  const params = useParams();

  setNavigationHistory("/menu");

  const [productDetails, setProductDetails] = useState<PizzaDetails | null>(
    null,
  );

  async function fetchProductDetails(id: string) {
    try {
      const details = await getPizzaDetails(id);
      setProductDetails(details);
      setTitle(details.name);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  const formattedValue = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  useEffect(() => {
    if (params.productId) {
      fetchProductDetails(params.productId);
    }
  }, []);

  return (
    <div className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div>
        <img
          src={productDetails?.image}
          alt={productDetails?.name}
          className="w-full h-40 mb-6 rounded-xl object-cover"
        />
        <Heading component="h1">{productDetails?.name}</Heading>
        <p className="text-base text-typography-base">
          {productDetails?.description}
        </p>
      </div>
      <div>
        <div className="flex items-center justify-between py-4 border-t border-interface-border">
          <p className="text-xl text-typography-dark font-black">Valor:</p>
          <span className="text-3xl font-bold text-brand-primary">
            {formattedValue(productDetails?.value ?? 0)}
          </span>
        </div>
        <Button
          fullWidth
          onClick={() => console.log("Produto adicionado ao carrinho:")}
          variant="primary"
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
}

export default ProductDetails;
