import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function Cpf() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cpf, setCpf] = useState("");

  useEffect(() => {
    setTitle("Parabens! Sua conta foi criada");
    setNavigationHistory("/register");
  }, [setTitle, setNavigationHistory]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCpf(value);
  };

  const getStoredUser = () => {
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      return typeof parsedUser === "string" ? JSON.parse(parsedUser) : parsedUser;
    } catch {
      return null;
    }
  };

  const handleContinue = () => {
    if (!cpf.trim()) {
      alert("Informe o CPF para continuar.");
      return;
    }

    const sanitizedCpf = cpf.replace(/\D/g, "");
    const user = getStoredUser();

    if (user) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          cpf: sanitizedCpf,
        }),
      );
    } else {
      sessionStorage.setItem("userCpf", JSON.stringify(sanitizedCpf));
    }

    sessionStorage.removeItem("hideAddress");
    navigate("/register/phone");
  };

  const handleSkip = () => {
    sessionStorage.setItem("hideAddress", "true");
    navigate("/", { replace: true });
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Heading component="h1">Parabens! Sua conta foi criada</Heading>
          <p className="text-typography-base text-base">
            Finalize seu cadastro adicionando mais informacoes.
          </p>
        </div>
        <Input
          type="text"
          name="cpf"
          id="cpf"
          label="CPF"
          placeholder="Digite seu CPF *"
          onChange={handleCpfChange}
          fullWidth
          noLabel
        />
        <Button
          variant="primary"
          onClick={handleContinue}
          fullWidth
          type="button"
        >
          Continuar
        </Button>
        <Button onClick={handleSkip} fullWidth type="button">
          Pular
        </Button>
      </div>
    </section>
  );
}

export default Cpf;
