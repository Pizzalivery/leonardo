import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import postAuthRegister, { type RegisterPayload } from "../../../api/postAuthRegister";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Criar conta");
    setNavigationHistory("/auth/login");
  }, []);

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
      sessionStorage.setItem("userToken", JSON.stringify(response.accessToken));
      sessionStorage.setItem("user", JSON.stringify(response.user));
      navigate("/auth/add-cpf");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 400) {
          alert("Preencha todos os campos corretamente.");
        }
        if (parsedError.statusCode === 409) {
          alert("Este e-mail já está cadastrado.");
        }
        if (parsedError.statusCode === 500) {
          alert("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
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
          placeholder="Seu nome completo"
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
          placeholder="Sua senha"
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
    </section>
  );
}

export default Register;
