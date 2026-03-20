import { useEffect, useState } from "react";
import { Heading, ProductListItem } from "../../components";
import { useOutletContext } from "react-router";
import getPizzas from "../../api/getPizzas";
import type { NavigationLayoutContext } from "../../components/Layouts/NavigationLayout/NavigationLayout";

type Pizza = {
  id: number;
  name: string;
  description: string;
  value: number;
  image: string;
};

function Menu() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<NavigationLayoutContext>();

  const [pizzas, setPizzas] = useState<Array<Pizza>>([]);
  const [isLoading, setIsLoading] = useState(false);

  setNavigationHistory("/");
  setTitle("Menu");

  async function fetchPizzas() {
    setIsLoading(true);

    try {
      const response = await getPizzas();
      setPizzas(response);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <article className="mx-auto p-6">
      <Heading component="h2">Pizzas</Heading>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        pizzas.map((pizza: Pizza) => (
          <ProductListItem
            key={pizza?.id}
            id={pizza?.id}
            image={pizza?.image}
            title={pizza?.name}
            description={pizza?.description}
            value={pizza?.value}
          />
        ))
      )}
    </article>
  );
}

export default Menu;
