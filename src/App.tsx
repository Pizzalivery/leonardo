import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { PrivateRoutes } from "./components";
import AuthLayout from "./components/Layouts/AuthLayout/AuthLayout";
import NavigationLayout from "./components/Layouts/NavigationLayout/NavigationLayout";
import ProductLayout from "./components/Layouts/ProductLayout/ProductLayout";
import "./styles/style.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Auth/Login/Login"));

const Register = lazy(() => import("./pages/Register/Register/Register"));
const RegisterCpf = lazy(() => import("./pages/Register/RegisterCpf/RegisterCpf"));
const RegisterPhone = lazy(() => import("./pages/Register/RegisterPhone/RegisterPhone"));
const RegisterCep = lazy(() => import("./pages/Register/RegisterCep/RegisterCep"));
const RegisterAddress = lazy(() => import("./pages/Register/RegisterAddress/RegisterAddress"));

const Search = lazy(() => import("./pages/Search/Search"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));

const Orders = lazy(() => import("./pages/Orders/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails/OrderDetails"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="auth/login" element={<AuthLayout />}>
            <Route index element={<Login />} />
          </Route>

          <Route path="register" element={<AuthLayout />}>
            <Route index element={<Register />} />
            <Route path="cpf" element={<RegisterCpf />} />
            <Route path="phone" element={<RegisterPhone />} />
            <Route path="cep" element={<RegisterCep />} />
            <Route path="address" element={<RegisterAddress />} />
          </Route>

          <Route path="search" element={<NavigationLayout />}>
            <Route index element={<Search />} />
          </Route>

          <Route path="menu" element={<NavigationLayout />}>
            <Route index element={<Menu />} />
          </Route>

          <Route path="products" element={<ProductLayout />}>
            <Route path=":productId" element={<ProductDetails />} />
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