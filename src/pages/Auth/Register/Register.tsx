import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";

function Register() {
  const navigate = useNavigate();

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

  const handleRegister = () => {
    setIsLoading(true);
    sessionStorage.setItem("registerData", JSON.stringify({ name, email, password }));
    setIsLoading(false);
    navigate("/register/cpf");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Criar sua conta</Heading>
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