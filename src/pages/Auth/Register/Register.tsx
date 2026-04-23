import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { LoaderCircle } from "lucide-react";

import { Button, Heading, Input } from "../../../components";
import postAuthRegister, {
  type RegisterPayload,
} from "../../../api/postAuthRegister";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [form, setForm] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/login");
  }, [setNavigationHistory, setTitle]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleRegister() {
    if (!form.name.trim()) {
      alert("Preencha seu nome.");
      return;
    }

    if (!form.email.trim()) {
      alert("Preencha seu e-mail.");
      return;
    }

    if (!form.password.trim()) {
      alert("Preencha sua senha.");
      return;
    }

    if (!form.confirmPassword.trim()) {
      alert("Confirme sua senha.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    const payload: RegisterPayload = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    setIsLoading(true);

    try {
      const response = await postAuthRegister(payload);

      if (response?.accessToken) {
        sessionStorage.setItem(
          "userToken",
          JSON.stringify(response.accessToken),
        );
      }

      if (response?.user) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(response));
      }

      sessionStorage.setItem(
        "registerAuth",
        JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      );

      navigate("/auth/register/cpf");
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);

          if (
            parsedError.message === "usuarios.errors.existingUser" ||
            parsedError.error === "usuarios.errors.existingUser"
          ) {
            alert("Este e-mail já está cadastrado. Tente outro e-mail.");
            return;
          }

          if (parsedError.statusCode === 400) {
            alert(parsedError.message || "Não foi possível criar a conta.");
            return;
          }

          if (parsedError.statusCode === 500) {
            alert(
              "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
            );
            return;
          }
        } catch {
          alert("Não foi possível criar a conta.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 min-h-[calc(100vh-88px)]">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading component="h1">Crie sua conta</Heading>
          <p className="max-w-[280px] text-sm text-typography-base">
            É rápido e fácil. Insira seus dados para começar.
          </p>
        </div>

        <Input
          type="text"
          name="name"
          id="name"
          label="Nome"
          placeholder="Daniela Isabela Sales"
          value={form.name}
          onChange={handleChange}
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
          value={form.email}
          onChange={handleChange}
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
          value={form.password}
          onChange={handleChange}
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
          value={form.confirmPassword}
          onChange={handleChange}
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
    </section>
  );
}

export default Register;