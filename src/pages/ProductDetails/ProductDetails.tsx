import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import type { ProductLayoutContext } from "../../components/Layouts/ProductLayout/ProductLayout";
import getPizzaDetails from "../../api/getPizzaDetails";
import { Button, Heading } from "../../components";
import { OrderContext } from "../../context/OrderContext";
import type { OrderContextProps, OrderItem, PizzaDetails } from "../../types";

function ProductDetails() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<ProductLayoutContext>();

  const { setOrders } = useContext<OrderContextProps>(OrderContext);

  const params = useParams();
  const navigate = useNavigate();

  setNavigationHistory("/menu");

  const [productDetails, setProductDetails] = useState<PizzaDetails>();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchProductDetails(id: string) {
    setIsLoading(true);
    try {
      const details = await getPizzaDetails(id);
      setProductDetails(details);
      setTitle(details.name);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const formattedValue = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const handleAdd = () => {
    const productToAdd = {
      id: productDetails?.id || 0,
      name: productDetails?.name || "",
      size: productDetails?.size[0] || "",
      category: productDetails?.category || "",
      image: productDetails?.image || "",
      value: productDetails?.value || 0,
    };

    setOrders((prevOrders: OrderItem[]) => [...prevOrders, productToAdd]);

    navigate("/cart");
  };

  useEffect(() => {
    if (params.productId) {
      fetchProductDetails(params.productId);
    }
  }, []);

  return (
    <div className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)] px-5">
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
        <Button fullWidth onClick={handleAdd} variant="primary">
          Adicionar
        </Button>
      </div>
    </div>
  );
}

export default ProductDetails;
