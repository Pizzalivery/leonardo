import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { LoaderCircle } from "lucide-react";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import postAuthRegister from "../../../api/postAuthRegister";
import postAuthLogin from "../../../api/postAuthLogin";

function Register() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid =
    name.trim() !== "" && isEmailValid && password !== "" && password === confirmPassword;

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/login");
  }, [setTitle, setNavigationHistory]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const saveLoginSession = (accessToken: string, user: unknown) => {
    sessionStorage.setItem("userToken", JSON.stringify(accessToken));
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.removeItem("userAddress");
  };

  const showRegisterError = (error: unknown) => {
    if (!(error instanceof Error)) {
      alert("Erro ao criar conta. Por favor, tente novamente.");
      return;
    }

    const parsedError = JSON.parse(error.message);

    if (parsedError.statusCode === 409 || parsedError.statusCode === 400) {
      alert("Este email já está em uso. Por favor, use outro email.");
      return;
    }

    if (parsedError.statusCode === 500) {
      alert("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
      return;
    }

    alert("Erro ao criar conta. Por favor, tente novamente.");
  };

  const createAccount = async () => {
    setIsLoading(true);

    try {
      await postAuthRegister({ name, email, password, role: "user" });
      const loginResponse = await postAuthLogin({ email, password });

      saveLoginSession(loginResponse.accessToken, loginResponse.user);
      navigate("/cadastro/cpf");
    } catch (error) {
      showRegisterError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    createAccount();
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
          type="email"
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
