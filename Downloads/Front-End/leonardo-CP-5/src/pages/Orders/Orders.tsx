import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Heading } from "../../components/Heading/Heading";
import { Card } from "../../components";
import type { NavigationLayoutContext } from "../../components/Layouts/NavigationLayout/NavigationLayout";
import getOrders from "../../api/getOrders";

type Order = {
  id: number;
  image: string;
};

function Orders() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<NavigationLayoutContext>();
  const navigate = useNavigate();
  setTitle("Pedidos");
  setNavigationHistory("/");

  const [orders, setOrders] = useState<Array<Order>>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchOrders() {
    setIsLoading(true);

    const userId = JSON.parse(sessionStorage.getItem("user") as string).id;

    try {
      const response = await getOrders(userId);
      setOrders(response);
    } catch (error) {
      // Type Guard
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 401) {
          // alert("Email ou senha incorretos. Por favor, tente novamente.");
          navigate("/auth/login");
        }
        if (parsedError.statusCode === 500) {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <article className="container">
      <Heading component="h2">Histórico</Heading>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.length ? (
            orders.map((order) => (
              <Card key={order.id}>
                <div className="flex items-center gap-4">
                  <img
                    src={order.image}
                    alt="Pizza"
                    className="w-16 h-16 rounded-xl"
                  />
                  <h3 className="text-base font-bold">Pedido #{order.id}</h3>
                </div>
              </Card>
            ))
          ) : (
            <p>Você ainda não fez seu primeiro pedido</p>
          )}
        </div>
      )}
    </article>
  );
}

export default Orders;
