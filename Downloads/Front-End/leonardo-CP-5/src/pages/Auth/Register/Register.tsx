import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import postAuthRegister, {
  type RegisterPayload,
} from "../../../api/postAuthRegister";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function generateRandomCpf(): string {
  const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  const sum1 = n.reduce((acc, val, i) => acc + val * (10 - i), 0);
  const d1 = (sum1 * 10) % 11 >= 10 ? 0 : (sum1 * 10) % 11;

  const sum2 = [...n, d1].reduce((acc, val, i) => acc + val * (11 - i), 0);
  const d2 = (sum2 * 10) % 11 >= 10 ? 0 : (sum2 * 10) % 11;

  const all = [...n, d1, d2];
  return (
    `${all.slice(0, 3).join("")}.` +
    `${all.slice(3, 6).join("")}.` +
    `${all.slice(6, 9).join("")}-` +
    `${d1}${d2}`
  );
}

function Register() {
  const navigate = useNavigate();
  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("/auth/login");
  }, [setNavigationHistory]);

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
      const user = await postAuthRegister(payload);
      sessionStorage.setItem("user", JSON.stringify(user));

      navigate("/auth/register/cpf");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 409) {
          alert("Este e-mail já está cadastrado. Por favor, faça login.");
        } else if (parsedError.statusCode === 400) {
          alert("Dados inválidos. Verifique os campos e tente novamente.");
        } else {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
      return;
    }

    // The API requires all fields at registration time.
    // CPF, phone and address are placeholders — the real values are sent
    // via PUT /users/{id} and PUT /users/{id}/address in the next steps.
    const payload: RegisterPayload = {
      name,
      email,
      password,
      cpf: generateRandomCpf(),
      role: "customer",
      phone: "(00) 00000-0000",
      address: {
        cep: "01310-100",
        street: "N/A",
        number: "0",
        neighborhood: "N/A",
        city: "N/A",
        state: "SP",
      },
    };
    fetchRegister(payload);
  };

  return (
    <section className="flex flex-col gap-6 pt-8">
      <div className="flex flex-col gap-2 text-center">
        <Heading component="h1">Crie sua conta</Heading>
        <p className="text-typography-base text-center">
          É rápido e fácil. Insira seus dados para começar.
        </p>
      </div>

      <div className="flex flex-col gap-4">
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
      </div>

      <Button
        variant="primary"
        onClick={handleRegister}
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Criar conta"}
      </Button>
    </section>
  );
}

export default Register;
