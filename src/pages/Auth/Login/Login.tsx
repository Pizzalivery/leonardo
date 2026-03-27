import { NavLink, useNavigate } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useState } from "react";
import postAuthLogin, { type LoginPayload } from "../../../api/postAuthLogin";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  async function fetchLogin(payload: LoginPayload) {
    setIsLoading(true);

    try {
      const response = await postAuthLogin(payload);
      sessionStorage.setItem("userToken", JSON.stringify(response.accessToken));
      sessionStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    } catch (error) {
      // Type Guard
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 401) {
          alert("Email ou senha incorretos. Por favor, tente novamente.");
        }
        if (parsedError.statusCode === 500) {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogin = () => {
    const payload = {
      email: user,
      password: password,
    };
    fetchLogin(payload);
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Seja bem vindo</Heading>
        <Input
          type="text"
          name="email"
          id="email"
          label="Email"
          placeholder="Seu e-mail"
          onChange={handleUserChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Input
          type="password"
          name="password"
          id="password"
          label="Senha"
          placeholder="Senha"
          onChange={handlePasswordChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <span className="text-right w-full ">
          <NavLink
            to="/forgot-password"
            className="text-brand-primary text-sm underline"
          >
            Esqueci minha senha
          </NavLink>
        </span>
        <Button
          variant="primary"
          onClick={handleLogin}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </div>
      <p className="text-center text-typography-base text-base">
        Não tem uma conta?{" "}
        <NavLink to="/register" className="text-brand-primary underline">
          Criar conta
        </NavLink>
      </p>
    </section>
  );
}

export default Login;
