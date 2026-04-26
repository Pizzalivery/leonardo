import { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import postRegister, { type RegisterPayload } from "../../../api/postRegister";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const outletContext = useOutletContext<AuthLayoutContext>();

  useEffect(() => {
    if (outletContext) {
      outletContext.setTitle("Crie sua conta");
      outletContext.setNavigationHistory("/auth/login");
    }
  }, [outletContext]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  async function fetchRegister(payload: RegisterPayload) {
    setIsLoading(true);

    try {
      const registerResponse = await postRegister(payload);

      const accessToken = registerResponse.accessToken as string | undefined;
      const user = registerResponse.user ?? registerResponse;

      if (!user || typeof user !== "object") {
        throw new Error(
          JSON.stringify({
            statusCode: 500,
            message: "Não foi possível recuperar os dados do usuário após o cadastro.",
          }),
        );
      }

      if (accessToken) {
        sessionStorage.setItem("userToken", JSON.stringify(accessToken));
      }
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("skipAddress", JSON.stringify(false));
      navigate("/auth/cpf");
    } catch (error) {
      if (error instanceof Error) {
        let message = "Verifique os dados e tente novamente.";

        try {
          const parsedError = JSON.parse(error.message);

          if (parsedError.statusCode === 400) {
            if (parsedError.message === "usuarios.errors.existingUser") {
              message =
                "Esse email já está cadastrado. Faça login ou use outro email.";
            } else if (parsedError.message) {
              message = parsedError.message;
            }
          } else if (parsedError.statusCode === 401) {
            message =
              "Cadastro realizado, mas não foi possível entrar automaticamente. Faça login para continuar.";
          } else if (parsedError.statusCode === 500) {
            message =
              "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.";
          }
        } catch {
          message = error.message;
        }

        alert(message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
      return;
    }

    const payload: RegisterPayload = {
      name: name.trim(),
      email: email.trim(),
      password: password,
    };

    fetchRegister(payload);
  };

  return (
    <section className="mx-auto w-[358px] h-[660px] px-4">
      <div className="flex h-full flex-col justify-between rounded-[36px] border border-interface-base bg-common-light p-6 shadow-[0_28px_80px_rgba(0,0,0,0.08)]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
        <div className="flex flex-col gap-2">
          <Heading component="h1" className="mb-0">Crie sua conta</Heading>
          <p className="text-sm text-typography-base">
            É rápido e fácil. Insira seus dados para começar.
          </p>
        </div>

        <Input
          type="text"
          name="name"
          id="name"
          label="Nome"
          placeholder="Nome *"
          onChange={handleNameChange}
          fullWidth
          noLabel
          disabled={isLoading}
          required
        />
        <Input
          type="email"
          name="email"
          id="email"
          label="Email"
          placeholder="Email *"
          onChange={handleEmailChange}
          fullWidth
          noLabel
          disabled={isLoading}
          required
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
          required
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
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Criar conta"}
        </Button>
        </form>

        <p className="text-center text-typography-base text-sm">
          Já tem uma conta?{" "}
          <NavLink to="/auth/login" className="text-brand-primary underline">
            Entrar
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
