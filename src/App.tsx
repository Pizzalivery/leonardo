import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import NavigationLayout from "./components/Layouts/NavigationLayout/NavigationLayout";
import ProductLayout from "./components/Layouts/ProductLayout/ProductLayout";
import "./styles/style.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Search = lazy(() => import("./pages/Search/Search"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails/OrderDetails"));
const ProductDetails = lazy(
  () => import("./pages/ProductDetails/ProductDetails"),
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="search" element={<NavigationLayout />}>
            <Route index element={<Search />} />
          </Route>
          <Route path="menu" element={<NavigationLayout />}>
            <Route index element={<Menu />} />
          </Route>
          <Route path="orders" element={<NavigationLayout />}>
            <Route index element={<Orders />} />
            <Route path=":orderId" element={<OrderDetails />} />
          </Route>
          <Route path="products" element={<ProductLayout />}>
            <Route path=":productId" element={<ProductDetails />} />
          </Route>

          {/* <Route path="orders?:orderId" element={<Orders />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
