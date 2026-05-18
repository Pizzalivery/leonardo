import { createContext, useMemo, useState } from "react";
import type { OrderContextProps, OrderItem } from "../types";

const OrderContext = createContext<OrderContextProps>({
  orders: [],
  setOrders: () => {},
  totalValue: 0,
  delveryFee: 0,
});

interface OrderProviderProps {
  children: React.ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const delveryFee = 5.9;

  const [orders, setOrders] = useState<OrderItem[]>([]);

  const totalValue = useMemo(
    () => orders.reduce((total, item) => total + item.value, 0),
    [orders],
  );

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        totalValue,
        delveryFee,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext };
