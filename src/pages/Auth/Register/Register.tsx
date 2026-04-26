import { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import postAuthRegister, {
  type RegisterPayload,
} from "../../../api/postAuthRegister";
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setConfirmPassword(e.target.value);


  async function fetchRegister(payload: RegisterPayload) {
    setIsLoading(true);
    try {
      const response = await postAuthRegister(payload);
     
      sessionStorage.setItem("userToken", JSON.stringify(response.accessToken));
      sessionStorage.setItem("user", JSON.stringify(response.user));
      navigate("/auth/add-cpf");
    } catch (error) {
      
      console.error("[Register] Erro ao criar conta:", error);

      let statusCode = 0;
      if (error instanceof Error) {
        try {
          statusCode = JSON.parse(error.message)?.statusCode ?? 0;
        } catch {
          
        }
      }

      if (statusCode === 409) {
        alert("Este e-mail já está cadastrado. Tente outro.");
      } else if (statusCode === 500) {
        alert("Erro no servidor. Tente novamente mais tarde.");
      } else {
        alert("Não foi possível criar a conta. Verifique sua conexão.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleCreateAccount = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }
    fetchRegister({ name, email, password });
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-5 items-center justify-center w-full max-w-sm mx-auto sm:max-w-md">
        <div className="text-center w-full">
          <Heading component="h1">Crie sua conta</Heading>
          <p className="text-typography-base text-sm -mt-4">
            É rápido e fácil. Insira seus dados para começar.
          </p>
        </div>

        <Input
          type="text"
          name="name"
          id="name"
          label="Nome completo"
          placeholder="Daniela Isabela Sales"
          value={name}
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
          value={email}
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
          value={password}
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
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />

        <Button
          variant="primary"
          onClick={handleCreateAccount}
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

      <p className="text-center text-typography-base text-sm pb-2">
        Já tem uma conta?{" "}
        <NavLink to="/auth/login" className="text-brand-primary underline">
          Entrar
        </NavLink>
      </p>
    </section>
  );
}

export default Register;
