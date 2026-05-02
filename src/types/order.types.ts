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

// {"id":3,"name":"Calabresa","size":["LARGE"],"category":"pizza","description":"Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas.","image":"https://cdn.accon.app/16057285666390640459715899877-1080p.jpg","value":82},{"id":7,"name":"Caprese","size":["LARGE"],"category":"pizza","description":"Base de muçarela especial fresca, fatias de tomate e de muçarela de búfala, folhas de manjericão orgânico e pesto artesanal de azeitonas pretas. Homenagem à Primo Basílico e à Bráz Pizzaria.","image":"https://cdn.accon.app/16070356917527736441516343995-1080p.jpg","value":125}

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
