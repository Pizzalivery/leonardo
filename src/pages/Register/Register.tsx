import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Heading, Input } from "../../components";
import postRegister, { type RegistrationPayload } from "../../api/postRegistration";
import { LoaderCircle } from "lucide-react";


function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
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

  const handleConfirmPassChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setConfirmPass(value);
  };


  
async function fetchRegister(payload: RegistrationPayload) {
  setIsLoading(true);
  try {
    const registerResponse = await postRegister(payload);
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
      alert("As devem ser iguais.");
      return;
    }
    const payload = { name, email, password };
    fetchRegister(payload);
  };

  return (
    <section className="grid grid-rows gap-4 h-[calc(100vh)]">
      <div className="flex flex-col gap-7 items-center justify-center">
        <Heading component="h1">Crie sua conta</Heading>
        <p className="text-typography-base text-base text-center">
          É rápido e fácil. Insira seus dados para começar
        </p>
        <Input
          type="text"
          name="name"
          id="name"
          label="Nome"
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
          label="E-mail"
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
          name="ConfirmPass"
          id="ConfirmPass"
          label="Confirmar senha"
          placeholder="Confirmar senha *"
          onChange={handleConfirmPassChange}
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