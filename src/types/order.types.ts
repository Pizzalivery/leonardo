import type { Address } from "./user.type";

export type OrderItem = {
  id: number;
  name: string;
  size: string;
  description?: string;
  category: string;
  image: string;
  value: number;
};

export type CreateOrder = {
  userId: string;
  pizzaIds: Array<number>;
  beverageIds: Array<number>;
  dessertIds: Array<number>;
  totalValue: number;
  deliveryAddress: Address;
};

export type Order = {
  id: number;
  userId: string;
  status: string;
  pizzas: OrderItem[];
  beverages: OrderItem[];
  desserts: OrderItem[];
  totalValue: number;
  deliveryAddress: Address;
  createdAt: string;
  mostExpensiveItemImage: string;
};

export interface OrderContextProps {
  orders: OrderItem[];
  setOrders: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  totalValue: number;
  delveryFee: number;
}
