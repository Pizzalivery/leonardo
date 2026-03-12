import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

// import "./styles/variables.css";
import "./styles/style.css";
import OrderLayout from "./components/Layouts/OrderLayout/OrderLayout";

// import Home from "./pages/Home/Home";
const Home = lazy(() => import("./pages/Home/Home")); // lazy loading

// import Login from "./pages/Login/Login";
const Login = lazy(() => import("./pages/Login/Login")); // lazy loading

// import Orders from "./pages/Orders/Orders";
const Orders = lazy(() => import("./pages/Orders/Orders")); // lazy loading

// import OrderDetails from "./pages/OrderDetails/OrderDetails";
const OrderDetails = lazy(() => import("./pages/OrderDetails/OrderDetails")); // lazy loading

// http://localhost:5173/orders/1234 Path params
// http://localhost:5173/orders?orderId=1234 Query params
// http://localhost:5173/orders?orderId=1234?status=delivered Query params

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
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
