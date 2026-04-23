import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import NavigationLayout from "./components/Layouts/NavigationLayout/NavigationLayout";
import ProductLayout from "./components/Layouts/ProductLayout/ProductLayout";
import AuthLayout from "./components/Layouts/AuthLayout/AuthLayout";
import "./styles/style.css";
import { PrivateRoutes } from "./components";

const Home = lazy(() => import("./pages/Home/Home"));
const Search = lazy(() => import("./pages/Search/Search"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails/OrderDetails"));
const ProductDetails = lazy(
  () => import("./pages/ProductDetails/ProductDetails"),
);
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Login = lazy(() => import("./pages/Auth/Login/Login"));
const Register = lazy(() => import("./pages/Auth/Register/Register"));
const AddCpf = lazy(() => import("./pages/Auth/AddCpf/AddCpf"));
const AddPhone = lazy(() => import("./pages/Auth/AddPhone/AddPhone"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<NavigationLayout />}>
            <Route index element={<Search />} />
          </Route>
          <Route path="menu" element={<NavigationLayout />}>
            <Route index element={<Menu />} />
          </Route>

          <Route path="products" element={<ProductLayout />}>
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="auth/login" element={<AuthLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="auth/register" element={<AuthLayout />}>
            <Route index element={<Register />} />
          </Route>
          <Route path="auth/add-cpf" element={<AuthLayout />}>
            <Route index element={<AddCpf />} />
          </Route>
          <Route path="auth/add-phone" element={<AuthLayout />}>
            <Route index element={<AddPhone />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="orders" element={<NavigationLayout />}>
              <Route index element={<Orders />} />
              <Route path=":orderId" element={<OrderDetails />} />
            </Route>

            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
