import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import postUserCPF, { type CPFPayload } from "../../../api/postUserCPF";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddCPF() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Adicionar CPF");
    setNavigationHistory("/auth/register");
  }, []);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCpf(value);
  };

  async function fetchAddCPF(payload: CPFPayload) {
    setIsLoading(true);

    try {
      await postUserCPF(payload);
      navigate("/auth/add-phone");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 400) {
          alert("CPF inválido. Por favor, tente novamente.");
        }
        if (parsedError.statusCode === 500) {
          alert("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    const payload = {
      cpf: cpf,
    };
    fetchAddCPF(payload);
  };

  const handleSkip = () => {
    sessionStorage.setItem("hasAddress", "false");
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Adicionar CPF</Heading>
        <Input
          type="text"
          name="cpf"
          id="cpf"
          label="CPF"
          placeholder="Seu CPF"
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
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
        </Button>
      </div>
      <p className="text-center text-typography-base text-base">
        <button
          onClick={handleSkip}
          className="text-brand-primary underline"
          disabled={isLoading}
        >
          Pular
        </button>
      </p>
    </section>
  );
}

export default AddCPF;
