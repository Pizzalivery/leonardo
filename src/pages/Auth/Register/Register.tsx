import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useEffect, useState } from "react";
import postAuthRegister, {
  type RegisterPayload,
} from "../../../api/postAuthRegister";
import type { FormLayoutContext } from "../../../components/Layouts/FormLayout/FormLayout";
import { LoaderCircle } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<FormLayoutContext>();

  useEffect(() => {
    setTitle("Criar conta");
    setNavigationHistory("/auth/login");
  }, [setTitle, setNavigationHistory]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      sessionStorage.setItem("user", JSON.stringify(response));
      navigate("/register/cpf");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 400) {
          alert("Dados inválidos. Por favor, verifique os campos.");
        }
        if (parsedError.statusCode === 409) {
          alert("E-mail já cadastrado.");
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

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }
    const payload = {
      name: name,
      email: email,
      password: password,
    };
    fetchRegister(payload);
  };

  return (
    <section className="flex flex-col gap-6 items-center justify-center min-h-[calc(100vh-88px)]">
      <div className="text-center">
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
        placeholder="Daniela Isabela Sales"
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
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Criar conta"}
      </Button>
    </section>
  );
}

export default Register;
