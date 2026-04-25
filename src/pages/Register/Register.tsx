import { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../components";
import postRegister, { type RegisterPayload } from "../../api/postRegister";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../components/Layouts/AuthLayout/AuthLayout";
import postAuthLogin from "../../api/postAuthLogin";

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
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

async function fetchRegister(payload: RegisterPayload) {
  setIsLoading(true);
  try {
    const registerResponse = await postRegister(payload);
    sessionStorage.setItem("user", JSON.stringify(registerResponse));
    sessionStorage.setItem("userPass", payload.password);
    // aq deu algum erro na api que só vai funcionar se Limpar o token antigo para forçar o login na próxima tela
    sessionStorage.removeItem("userToken");
    navigate("/register/cpf");
  } catch (error) {
    if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);
        if (parsedError.message === "usuarios.errors.existinguser") {
          alert("Este e-mail já está em uso.");
        } else {
          alert("Erro ao criar conta. Tente novamente.");
        }
      } catch {
        alert("Erro inesperado. Tente novamente.");
      }
    }
  } finally {
    setIsLoading(false);
  }
}

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    const payload = { name, email, password };
    fetchRegister(payload);
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Crie sua conta</Heading>
        <p className="text-typography-base text-sm text-center">
          É rápido e fácil. Insira seus dados para começar
        </p>
        <Input
          type="text"
          name="name"
          id="name"
          label="Nome"
          placeholder="Seu nome completo"
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
          placeholder="E-mail *"
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