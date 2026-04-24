import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import postAuthRegister from "../../../api/postAuthRegister";

function Register() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setTitle("Criar conta");
    setNavigationHistory("/auth/login");
  }, [setTitle, setNavigationHistory]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response: any = await postAuthRegister({
        name,
        email,
        password,
        role: "USER",
      });

      sessionStorage.setItem("token", response?.token || "");
      sessionStorage.setItem("userName", response?.name || name);

      navigate("/auth/add-cpf");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar conta");
    }
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 text-center">
          <Heading component="h1">Crie sua conta</Heading>
          <p className="text-typography-base text-sm">
            É rápido e fácil. Insira seus dados para começar.
          </p>
        </div>

        <Input
          type="text"
          name="name"
          id="name"
          label="Nome completo"
          placeholder="Seu nome completo"
          onChange={handleNameChange}
          fullWidth
          noLabel
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
        />

        <Button variant="primary" onClick={handleRegister} fullWidth>
          Criar conta
        </Button>
      </div>
    </section>
  );
}

export default Register;