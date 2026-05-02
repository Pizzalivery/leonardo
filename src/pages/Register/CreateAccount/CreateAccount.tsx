import { useNavigate, useOutletContext } from "react-router";
import { Button, ErrorLabel, Heading, Input } from "../../../components";
import { useEffect, useState } from "react";
import postCreateAccount from "../../../api/postCreateAccount";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import type { CreateAccount } from "../../../types";

function CreateAccount() {
  const navigate = useNavigate();

  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    state: boolean;
    message: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  async function fetchCreateAccount(payload: CreateAccount) {
    setIsLoading(true);

    try {
      const response = await postCreateAccount(payload);

      const userData = {
        name: response.name,
        email: response.email,
        id: response.id,
      };

      sessionStorage.setItem("user", JSON.stringify(userData));
      navigate("/register/documents");
    } catch (error) {
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

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (password !== e.target.value) {
      setErrors({ state: true, message: "As senhas não coincidem." });
    } else {
      setErrors({ state: false, message: "" });
    }
  };

  const handleCreateAccount = () => {
    const payload = {
      name,
      email,
      password,
      role: "customer",
    };

    fetchCreateAccount(payload);
  };

  useEffect(() => {
    setNavigationHistory("/auth/login");
  }, []);

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Heading component="h1">Crie sua conta</Heading>
          <p className="text-center text-typography-base text-base">
            É rápido e fácil. Insira seus dados para começar.
          </p>
        </div>
        <Input
          type="text"
          name="name"
          id="name"
          label="Nome"
          placeholder="Seu nome"
          onChange={handleChangeName}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Input
          type="text"
          name="email"
          id="email"
          label="Email"
          placeholder="Seu e-mail"
          onChange={handleChangeEmail}
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
          onChange={handleChangePassword}
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
        {errors && <ErrorLabel id="cep">{errors.message}</ErrorLabel>}
        <Button
          variant="primary"
          onClick={handleCreateAccount}
          fullWidth
          disabled={isLoading || errors?.state}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Criar conta"
          )}
        </Button>
      </div>
    </section>
  );
}

export default CreateAccount;
