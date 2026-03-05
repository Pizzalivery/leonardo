import { Link, NavLink, useNavigate } from "react-router";

function Orders() {
  const navigate = useNavigate();

  const handleCkick = () => {
    navigate("/orders/1234");
  };

  return (
    <>
      <h1>Orders</h1>
      <Link to="/">Home</Link>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Login
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Pedidos
      </NavLink>

      <hr />

      <NavLink to="/orders/1234">Ver pedido</NavLink>
      <button onClick={handleCkick}>ver pedido</button>
    </>
  );
}

export default Orders;
