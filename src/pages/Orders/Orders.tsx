import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Heading } from "../../components/Heading/Heading";
import { Badge, Card } from "../../components";
import type { NavigationLayoutContext } from "../../components/Layouts/NavigationLayout/NavigationLayout";
import getOrders from "../../api/getOrders";
import type { Order } from "../../types";

const OrderStatus = {
  preparation: "Andamento",
  delivered: "Entregue",
  canceled: "Cancelado",
} as const;

type OrderStatusKey = keyof typeof OrderStatus;

function Orders() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<NavigationLayoutContext>();
  const navigate = useNavigate();
  setTitle("Pedidos");
  setNavigationHistory("/");

  const [, setOrders] = useState<Array<Order>>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [finishedOrders, setFinishedOrders] = useState<Array<Order>>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchOrders() {
    setIsLoading(true);

    const userId = JSON.parse(sessionStorage.getItem("user") as string).id;

    try {
      const response = await getOrders(userId);
      setOrders(response);

      setActiveOrder(
        response.find((order: Order) => order.status === "preparation") || null,
      );
      setFinishedOrders(
        response.filter((order: Order) => order.status !== "preparation"),
      );
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 401) {
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <article className="container">
      {activeOrder && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Heading component="h2">Pedido em andamento</Heading>
          <Card>
            <div className="flex items-center gap-4">
              <img
                src={activeOrder.mostExpensiveItemImage}
                alt="Pizza"
                className="w-16 h-16 rounded-xl"
              />
              <div className="w-full">
                <div className="flex justify-between items-baseline gap-4 mb-3">
                  <Heading component="h3">Pedido #{activeOrder.id}</Heading>
                  <Badge size="small">
                    {OrderStatus[activeOrder.status as OrderStatusKey]}
                  </Badge>
                </div>
                <p className="text-typography-light">
                  {formatDate(activeOrder.createdAt)} -{" "}
                  {activeOrder.totalValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
      <Heading component="h2">Histórico</Heading>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finishedOrders.length ? (
            finishedOrders.map((finished: Order) => (
              <Card key={finished.id}>
                <div className="flex items-center gap-4">
                  <img
                    src={finished.mostExpensiveItemImage}
                    alt="Pizza"
                    className="w-16 h-16 rounded-xl"
                  />
                  <div className="w-full">
                    <div className="flex justify-between items-baseline gap-4 mb-3">
                      <Heading component="h3">Pedido #{finished.id}</Heading>

                      <Badge
                        size="small"
                        variant={
                          finished.status === "delivered" ? "success" : "error"
                        }
                      >
                        {OrderStatus[finished.status as OrderStatusKey]}
                      </Badge>
                    </div>

                    <p className="text-typography-light">
                      {formatDate(finished.createdAt)} -{" "}
                      {finished.totalValue.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
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
