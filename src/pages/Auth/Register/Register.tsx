import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import postAuthRegister, { type RegistrationPayload } from "../../../api/postAuthRegister";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function Register() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Criar conta");
    setNavigationHistory("/auth/login");
  }, [setTitle, setNavigationHistory]);

  async function fetchRegister(payload: RegistrationPayload) {
    setIsLoading(true);
    try {
      const registerResponse = await postAuthRegister(payload);
      // A API retorna o objeto do usuário diretamente (sem token ainda)
      sessionStorage.setItem("user", JSON.stringify(registerResponse));
      sessionStorage.setItem("userPass", payload.password);
      sessionStorage.removeItem("userToken");
      navigate("/register/cpf");
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);
          if (parsedError.message === "usuarios.errors.existinguser") {
            alert("E-mail já foi cadastrado.");
          } else {
            alert("Erro!! Algo deu errado, tente novamente.");
          }
        } catch {
          alert("Erro!! Tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleRegister = () => {
    if (password !== confirmPass) {
      alert("As senhas devem ser iguais.");
      return;
    }
    fetchRegister({ name, email, password });
  };

  return (
    <section className="grid grid-rows gap-4 h-[calc(100vh)]">
      <div className="flex flex-col gap-7 items-center justify-center">
        <Heading component="h1">Crie sua conta</Heading>
        <p className="text-typography-base text-base text-center">
          É rápido e fácil. Insira seus dados para começar
        </p>
        <Input type="text" name="name" id="name" label="Nome" placeholder="Nome completo *"
          onChange={(e) => setName(e.target.value)} fullWidth noLabel disabled={isLoading} />
        <Input type="email" name="email" id="email" label="E-mail" placeholder="email *"
          onChange={(e) => setEmail(e.target.value)} fullWidth noLabel disabled={isLoading} />
        <Input type="password" name="password" id="password" label="Senha" placeholder="Senha *"
          onChange={(e) => setPassword(e.target.value)} fullWidth noLabel disabled={isLoading} />
        <Input type="password" name="ConfirmPass" id="ConfirmPass" label="Confirmar senha" placeholder="Confirmar senha *"
          onChange={(e) => setConfirmPass(e.target.value)} fullWidth noLabel disabled={isLoading} />
        <Button variant="primary" onClick={handleRegister} fullWidth disabled={isLoading}>
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Criar conta"}
        </Button>
      </div>
    </section>
  );
}

export default Register;
