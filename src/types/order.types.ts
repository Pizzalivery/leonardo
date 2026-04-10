export type OrderItem = {
  id: number;
  name: string;
  size: string;
  category: string;
  image: string;
  value: number;
};

export interface OrderContextProps {
  orders: OrderItem[];
  setOrders: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  // totalValue: number;
  // setTotalValue: React.Dispatch<React.SetStateAction<number>>;
}
