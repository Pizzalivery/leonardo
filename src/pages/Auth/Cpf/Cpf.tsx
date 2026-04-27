import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import patchUserCpf from "../../../api/patchUserCpf";

function Cpf() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Parabens! Sua conta foi criada");
    setNavigationHistory("/register");
  }, [setTitle, setNavigationHistory]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCpf(value);
  };

  async function updateCpf(value: string) {
    setIsLoading(true);

    try {
      await patchUserCpf({ cpf: value });
      sessionStorage.removeItem("hideAddress");
      navigate("/register/phone");
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);
          const message = parsedError.message || parsedError.error;
          alert(message || "Nao foi possivel salvar o CPF. Tente novamente.");
        } catch {
          alert("Nao foi possivel salvar o CPF. Tente novamente.");
        }
        return;
      }
      alert("Nao foi possivel salvar o CPF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    if (!cpf.trim()) {
      alert("Informe o CPF para continuar.");
      return;
    }

    const sanitizedCpf = cpf.replace(/\D/g, "");
    updateCpf(sanitizedCpf);
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
          disabled={isLoading}
        />
        <Button
          variant="primary"
          onClick={handleContinue}
          fullWidth
          disabled={isLoading}
        >
          Continuar
        </Button>
        <Button onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default Cpf;
