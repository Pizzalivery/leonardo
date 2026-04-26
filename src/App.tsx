import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import NavigationLayout from "./components/Layouts/NavigationLayout/NavigationLayout";
import ProductLayout from "./components/Layouts/ProductLayout/ProductLayout";
import AuthLayout from "./components/Layouts/AuthLayout/AuthLayout";
import { PrivateRoutes } from "./components";
import "./styles/style.css";
import AddressDetails from "./pages/AddressDetails/AddressDetails";

const Home = lazy(() => import("./pages/Home/Home"));
const Search = lazy(() => import("./pages/Search/Search"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails/OrderDetails"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Login = lazy(() => import("./pages/Auth/Login/Login"));
const Register = lazy(() => import("./pages/Auth/Register/Register"));
const Cpf = lazy(() => import("./pages/Auth/Cpf/Cpf"));
const RegisterPhone = lazy(() => import("./pages/RegisterPhone/RegisterPhone"));
const RegisterAddress = lazy(() => import("./pages/RegisterAddress/RegisterAddress"));

function App() {
  return (
      <Suspense fallback={<div>Carregando sistema...</div>}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/" element={<Navigate to="/auth/login" replace />} />

          <Route path="auth" element={<AuthLayout />}>
           <Route index element={<Navigate to="login" replace />} />
           <Route path="login" element={<Login />} />
           <Route path="register" element={<Register />} />
           
           {/* AQUI VOCÊ USA OS COMPONENTES QUE IMPORTOU ACIMA */}
           <Route path="cpf" element={<Cpf />} />
           <Route path="phone" element={<RegisterPhone />} />
           <Route path="cep" element={<RegisterAddress />} />
            <Route path="address-details" element={<AddressDetails />} />
         </Route>

          {/* Rotas Gerais */}
          <Route path="search" element={<NavigationLayout />}>
            <Route index element={<Search />} />
          </Route>
          
          <Route path="menu" element={<NavigationLayout />}>
            <Route index element={<Menu />} />
          </Route>

          <Route path="products" element={<ProductLayout />}>
            <Route path=":productId" element={<ProductDetails />} />
          </Route>

          {/* Rotas Protegidas com Layout da Pizzaria */}
          <Route element={<PrivateRoutes />}>
            <Route element={<NavigationLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="orders">
                <Route index element={<Orders />} />
                <Route path=":orderId" element={<OrderDetails />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
  );
}   

export default App;