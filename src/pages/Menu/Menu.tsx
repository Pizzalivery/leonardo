import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  Heading,
  ProductListItem,
  ProductListItemSkeleton,
} from "../../components";
import { useOutletContext } from "react-router";
import getPizzas from "../../api/getPizzas";
import type { NavigationLayoutContext } from "../../components/Layouts/NavigationLayout/NavigationLayout";
import type { OrderContextProps, OrderItem } from "../../types";
import { OrderContext } from "../../context/OrderContext";
import getBeverages from "../../api/getBeverages";
import getDesserts from "../../api/getDesserts";

type Product = {
  category: string;
  id: number;
  name: string;
  description: string;
  value: number;
  image: string;
  type?: string;
  size?: string;
};

function Menu() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<NavigationLayoutContext>();
  const { setOrders } = useContext<OrderContextProps>(OrderContext);

  const [pizzas, setPizzas] = useState<Array<Product>>([]);
  const [beverages, setBeverages] = useState<Array<Product>>([]);
  const [desserts, setDesserts] = useState<Array<Product>>([]);

  const [isLoading, setIsLoading] = useState(false);

  async function fetchProducts() {
    setIsLoading(true);

    try {
      const [pizzasData, beveragesData, dessertsData] = await Promise.all([
        getPizzas(),
        getBeverages(),
        getDesserts(),
      ]);

      setPizzas(pizzasData);
      setBeverages(beveragesData);
      setDesserts(dessertsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useLayoutEffect(() => {
    setNavigationHistory("/");
    setTitle("Menu");
  }, [setTitle, setNavigationHistory]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = useCallback(
    (id: number) => {
      const productDetails = pizzas.find((pizza) => pizza.id === id);

      if (!productDetails) return;

      const productToAdd: OrderItem = {
        id: productDetails.id,
        name: productDetails.name,
        size: productDetails.size?.[0] || "",
        category: productDetails.category || "",
        image: productDetails.image,
        value: productDetails.value,
      };

      setOrders((prevOrders: OrderItem[]) => [...prevOrders, productToAdd]);
    },
    [pizzas, setOrders],
  );

  const handleAddTocart = useCallback(
    (id: number) => {
      handleAdd(id);
    },
    [handleAdd],
  );

  const drinksByType = useMemo(
    () => ({
      water: beverages.filter((d) => d.type === "water"),
      beer: beverages.filter((d) => d.type === "beer"),
      soda: beverages.filter((d) => d.type === "soda"),
      wine: beverages.filter((d) => d.type === "wine"),
    }),
    [beverages],
  );

  return (
    <article className="mx-auto p-6">
      <Heading component="h2">Pizzas</Heading>

      {isLoading ? (
        <ProductListItemSkeleton />
      ) : (
        <>
          {pizzas.map((pizza: Product) => (
            <ProductListItem
              key={pizza?.id}
              id={pizza?.id}
              image={pizza?.image}
              title={pizza?.name}
              description={pizza?.description}
              value={pizza?.value}
              onClickAdd={handleAddTocart}
            />
          ))}
          {Object.values(drinksByType)
            .flat()
            .map((beverage: Product) => (
              <ProductListItem
                key={beverage?.id}
                id={beverage?.id}
                image={beverage?.image}
                title={beverage?.name}
                description={beverage?.description}
                value={beverage?.value}
                onClickAdd={handleAddTocart}
              />
            ))}
          {desserts.map((dessert: Product) => (
            <ProductListItem
              key={dessert?.id}
              id={dessert?.id}
              image={dessert?.image}
              title={dessert?.name}
              description={dessert?.description}
              value={dessert?.value}
              onClickAdd={handleAddTocart}
            />
          ))}
        </>
      )}
    </article>
  );
}

export default Menu;
