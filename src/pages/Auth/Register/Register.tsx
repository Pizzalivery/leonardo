import { NavLink, useNavigate, useOutletContext } from "react-router";
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
    const payload = {
      name: name,
      email: email,
      password: password,
    };
    fetchRegister(payload);
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Crie sua conta</Heading>
        <Input
          type="text"
          name="name"
          id="name"
          label="Nome"
          placeholder="Seu nome"
          onChange={handleNameChange}
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
          placeholder="Senha"
          onChange={handlePasswordChange}
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
