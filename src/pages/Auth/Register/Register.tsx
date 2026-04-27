import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import postAuthRegister, {
  type RegisterPayload,
} from "../../../api/postAuthRegister";

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
    setTitle("Crie sua conta");
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
      const response = await postAuthRegister(payload);
      const accessToken =
        response.accessToken || response.token || response.access_token || null;

      if (accessToken) {
        sessionStorage.setItem("userToken", JSON.stringify(accessToken));
      }

      sessionStorage.setItem("user", JSON.stringify(response.user));
      navigate("/register/cpf");
    } catch (error) {
      if (error instanceof Error) {
        alert("Nao foi possivel criar a conta. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Preencha todos os campos antes de continuar.");
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      alert("Informe um email valido.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas nao conferem. Por favor, tente novamente.");
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
        <div className="text-center">
          <Heading component="h1">Crie sua conta</Heading>
          <p className="text-typography-base text-base">
            E rápido e fácil. Insira seus dados para começar.
          </p>
        </div>
        <Input
          type="text"
          name="name"
          id="name"
          label="Nome"
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
          label="Email"
          placeholder="email *"
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
          label="Confirmar senha"
          placeholder="Confirmar senha *"
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
          Criar conta
        </Button>
      </div>
    </section>
  );
}

export default Register;
