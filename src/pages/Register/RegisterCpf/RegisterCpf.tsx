import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { LoaderCircle } from "lucide-react";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import postUserCpf from "../../../api/postUserCpf";

function getLoggedUser() {
  return JSON.parse(sessionStorage.getItem("user") || "{}");
}

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function RegisterCpf() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cleanedCpf = onlyNumbers(cpf);
  const isCpfValid = cleanedCpf.length === 11;

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  };

  const goHomeWithoutAddress = () => {
    sessionStorage.removeItem("userAddress");
    navigate("/", { state: { showAddress: false } });
  };

  const saveCpf = async () => {
    const user = getLoggedUser();
    setIsLoading(true);

    try {
      await postUserCpf(user.id, cleanedCpf);
      navigate("/cadastro/telefone");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 500) {
          alert("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
        } else {
          alert("Erro ao salvar CPF. Por favor, tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (!isCpfValid) return;
    saveCpf();
  };

  const handleSkip = () => {
    goHomeWithoutAddress();
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="w-full text-center">
          <Heading component="h1">Parabéns! Sua conta foi criada</Heading>
          <p className="text-typography-base text-sm mt-2">
            Finalize seu cadastro adicionando mais informações.
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
          disabled={isLoading || !isCpfValid}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
        </Button>

        <Button variant="default" onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterCpf;
