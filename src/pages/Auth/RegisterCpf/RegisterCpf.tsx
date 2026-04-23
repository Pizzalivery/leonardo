import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useState, useEffect } from "react";
import putUserCpf from "../../../api/postUserCpf";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function RegisterCpf() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();
  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isCpfValid = cpf.replace(/\D/g, "").length === 11;

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, []);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };

  async function fetchCpf() {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    setIsLoading(true);

    try {
      await putUserCpf(user.id, cpf.replace(/\D/g, ""));
      navigate("/cadastro/telefone");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 500) {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        } else {
          alert("Erro ao salvar CPF. Por favor, tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    fetchCpf();
  };

  const handleSkip = () => {
    navigate("/");
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
        <button
          onClick={handleSkip}
          className="text-typography-base text-sm underline bg-transparent border-0 cursor-pointer"
        >
          Pular
        </button>
      </div>
    </section>
  );
}

export default RegisterCpf;
