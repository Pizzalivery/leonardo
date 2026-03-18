import { useNavigate, useOutletContext } from "react-router";
import { Heading } from "../../components/Heading/Heading";
import { Card } from "../../components";
import PizzaImage from "../../assets/16057285666390640459715899877-1080p.jpg";

const mockOrders = [
  {
    id: "1234",
    name: "Pedido #1234",
    image: PizzaImage,
    createdAt: "2026-02-01T12:00:00Z",
    value: 59.99,
  },
  {
    id: "5678",
    name: "Pedido #5678",
    image: PizzaImage,
    createdAt: "2026-01-02T15:30:00Z",
    value: 42.5,
  },
  {
    id: "9012",
    name: "Pedido #9012",
    image: PizzaImage,
    createdAt: "2025-06-03T18:45:00Z",
    value: 75.0,
  },
  {
    id: "3456",
    name: "Pedido #3456",
    image: PizzaImage,
    createdAt: "2025-06-04T20:15:00Z",
    value: 89.99,
  },
];

function Orders() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext();

  setTitle("Pedidos");
  setNavigationHistory("/");

  const handleCkick = () => {
    navigate("/orders/1234");
  };

  return (
    <article className="container">
      <Heading component="h2">Histórico</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOrders.map((order) => (
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
        ))}
      </div>
      {/* <button onClick={handleCkick}>Ver pedido</button> */}
    </article>
  );
}

export default Orders;
