import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import OrderLayout from "./components/Layouts/OrderLayout/OrderLayout";
import "./styles/style.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails/OrderDetails"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="menu" element={<OrderLayout />}>
            <Route index element={<Menu />} />
            {/* <Route path="menu" element={<Menu />} /> */}
          </Route>
          <Route path="orders" element={<OrderLayout />}>
            <Route index element={<Orders />} />
            <Route path=":orderId" element={<OrderDetails />} />
          </Route>

          {/* <Route path="orders?:orderId" element={<Orders />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
