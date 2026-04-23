import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useState, useEffect } from "react";
import postAuthRegister from "../../../api/postAuthRegister";
import postAuthLogin from "../../../api/postAuthLogin";
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

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid =
    name.trim() !== "" &&
    isEmailValid &&
    password !== "" &&
    password === confirmPassword;

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/login");
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  async function fetchRegister() {
    setIsLoading(true);

    try {
      await postAuthRegister({ name, email, password, role: "user" });

      const loginResponse = await postAuthLogin({ email, password });
      sessionStorage.setItem(
        "userToken",
        JSON.stringify(loginResponse.accessToken),
      );
      sessionStorage.setItem("user", JSON.stringify(loginResponse.user));

      navigate("/cadastro/cpf");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 409 || parsedError.statusCode === 400) {
          alert("Este email já está em uso. Por favor, use outro email.");
        } else if (parsedError.statusCode === 500) {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        } else {
          alert("Erro ao criar conta. Por favor, tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = () => {
    fetchRegister();
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="w-full text-center">
          <Heading component="h1">Crie sua conta</Heading>
          <p className="text-typography-base text-sm mt-2">
            É rápido e fácil. Insira seus dados para começar.
          </p>
        </div>
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
          type="text"
          name="email"
          id="email"
          label="Email *"
          placeholder="Email *"
          onChange={handleEmailChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Input
          type="password"
          name="password"
          id="password"
          label="Senha *"
          placeholder="Senha *"
          onChange={handlePasswordChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirmar senha *"
          placeholder="Confirmar senha *"
          onChange={handleConfirmPasswordChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Button
          variant="primary"
          onClick={handleSubmit}
          fullWidth
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Criar conta"}
        </Button>
      </div>
    </section>
  );
}

export default Register;
