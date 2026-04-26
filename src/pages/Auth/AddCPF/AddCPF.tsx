import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import patchUserCpf, { type CpfPayload } from "../../../api/patchUserCpf";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddCPF() {
  const navigate = useNavigate();
  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("/auth/login");
  }, [setNavigationHistory]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCpf(value);
  };

  async function fetchAddCpf(id: string, payload: CpfPayload) {
    setIsLoading(true);

    try {
      await patchUserCpf(id, payload);
      navigate("/auth/register/phone");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 500) {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        } else {
          alert("Erro ao adicionar CPF. Por favor, tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    const user = JSON.parse(sessionStorage.getItem("user") as string);

    const payload: CpfPayload = { cpf };
    fetchAddCpf(user.id, payload);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
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
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Continuar"
          )}
        </Button>
        <button
          onClick={handleSkip}
          className="text-typography-base text-sm underline cursor-pointer"
        >
          Pular
        </button>
      </div>
    </section>
  );
}

export default AddCPF;
