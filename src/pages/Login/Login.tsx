import { Link, NavLink } from "react-router";

function Login() {
  return (
    <>
      <h1>Login</h1>

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
    </>
  );
}

export default Login;
