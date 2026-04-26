import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Deve ser -dom
import { useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import patchUserCpf from "../../../api/patchUserCpf";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function Cpf() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const outletContext = useOutletContext<AuthLayoutContext>();

  useEffect(() => {
    if (outletContext) {
      outletContext.setTitle("Cadastro de CPF");
      outletContext.setNavigationHistory("/auth/register");
    }
  }, [outletContext]);

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  };

  const handleContinue = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cpf.trim()) {
      alert("Por favor, informe o CPF para continuar.");
      return;
    }

    setIsLoading(true);
    try {
      await patchUserCpf({ cpf: cpf.trim() });
      sessionStorage.setItem("skipAddress", JSON.stringify(false));
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        let message = "Erro ao atualizar CPF. Tente novamente.";
        try {
          const parsedError = JSON.parse(error.message);
          if (parsedError.message) {
            message = parsedError.message;
          }
        } catch {
          message = error.message;
        }
        alert(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem("skipAddress", JSON.stringify(true));
    navigate("/");
  };

  return (
    <section className="mx-auto w-[358px] h-[660px] px-4">
      <div className="flex h-full flex-col justify-between rounded-[36px] border border-interface-base bg-common-light p-6 shadow-[0_28px_80px_rgba(0,0,0,0.08)]">
        <form
          onSubmit={handleContinue}
          className="flex flex-col gap-6"
        >
        <div className="flex flex-col gap-2">
          <Heading component="h1">Parabéns! Sua conta foi criada</Heading>
          <p className="text-sm text-typography-base">
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
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
        </Button>
        </form>

        <p className="text-center text-typography-base text-sm">
          <button
            type="button"
            className="text-brand-primary underline"
            onClick={handleSkip}
          >
            Pular
          </button>
        </p>
      </div>
    </section>
  );
}

export default Cpf;
