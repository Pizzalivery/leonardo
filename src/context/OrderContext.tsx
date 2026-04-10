import { createContext, useState } from "react";
import type { OrderContextProps, OrderItem } from "../types";

// {formattedValue(
//   mockCartItems.reduce(
//     (acc, item) => acc + item.value, delveryFee),
// )}

const OrderContext = createContext<OrderContextProps>({
  orders: [],
  setOrders: () => {},
}); // Cria o contexto para o pedido, inicialmente com valor nulo

interface OrderProviderProps {
  children: React.ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  // const [totalValue, setTotalValue] = useState(0);

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        // totalValue,
        // setTotalValue,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext };
