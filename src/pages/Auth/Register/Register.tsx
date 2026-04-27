import { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import postAuthRegister, {
  type RegisterPayload,
} from "../../../api/postAuthRegister";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function Register() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/login");
  }, [setTitle, setNavigationHistory]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  async function fetchRegister(payload: RegisterPayload) {
    setIsLoading(true);

    try {
      const registeredUser = await postAuthRegister(payload);

      console.log("Register response completo:", registeredUser);

      sessionStorage.setItem("user", JSON.stringify(registeredUser));
      sessionStorage.setItem(
        "pendingCredentials",
        JSON.stringify({ email: payload.email, password: payload.password }),
      );

      navigate("/auth/register/cpf");
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);

          if (parsedError.statusCode === 400) {
            alert("Dados inválidos. Por favor, verifique os campos.");
          } else if (parsedError.statusCode === 409) {
            alert("E-mail já cadastrado. Por favor, utilize outro e-mail.");
          } else {
            alert(
              "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
            );
          }
        } catch {
          alert(
            "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    const payload: RegisterPayload = {
      name,
      email,
      password,
      role: "customer",
    };

    fetchRegister(payload);
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Crie sua conta</Heading>
        <p className="text-typography-base text-sm text-center">
          É rápido e fácil. Insira seus dados para começar.
        </p>
        <Input
          type="text"
          name="name"
          id="name"
          label="Nome completo"
          placeholder="Nome completo"
          onChange={handleNameChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Input
          type="email"
          name="email"
          id="email"
          label="E-mail"
          placeholder="E-mail"
          onChange={handleEmailChange}
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
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirmar senha"
          placeholder="Confirmar senha"
          onChange={handleConfirmPasswordChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Button
          variant="primary"
          onClick={handleRegister}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Criar conta"
          )}
        </Button>
      </div>
      <p className="text-center text-typography-base text-base">
        Já tem uma conta?{" "}
        <NavLink to="/auth/login" className="text-brand-primary underline">
          Entrar
        </NavLink>
      </p>
    </section>
  );
}

export default Register;
