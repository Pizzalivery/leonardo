import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../../components";
import { LoaderCircle } from "lucide-react";
import putUserCpf, { type CpfPayload } from "../../../../api/patchUserCpf";
import type { AuthLayoutContext } from "../../../../components/Layouts/AuthLayout/AuthLayout";

function AddCpf() {
  const navigate = useNavigate();
  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("");
  }, [setNavigationHistory]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCpf(value);
  };

  async function fetchCpf(payload: CpfPayload) {
    setIsLoading(true);
    const rawToken = sessionStorage.getItem("userToken");
    const token =
      rawToken && rawToken !== "undefined" ? JSON.parse(rawToken) : null;

    const rawUser = sessionStorage.getItem("user");
    const storedUser =
      rawUser && rawUser !== "undefined" ? JSON.parse(rawUser) : null;
    const userId = storedUser?.id;

    try {
      await putUserCpf(userId, payload, token);
      navigate("/auth/register/phone");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 400) {
          alert("CPF inválido. Verifique e tente novamente.");
        } else {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    const payload: CpfPayload = { cpf };
    fetchCpf(payload);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="flex flex-col gap-6 pt-8">
      <div className="flex flex-col gap-2 text-center">
        <Heading component="h1">Parabéns! Sua conta foi criada</Heading>
        <p className="text-typography-base text-center">
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
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
      </Button>

      <button
        onClick={handleSkip}
        className="w-full py-2 font-black text-base text-typography-dark text-center cursor-pointer bg-transparent border-none"
      >
        Pular
      </button>
    </section>
  );
}

export default AddCpf;
