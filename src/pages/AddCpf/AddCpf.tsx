import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../components";
import { useEffect, useState } from "react";
import putUserCpf, { type CpfPayload } from "../../api/putUserCpf";
import type { FormLayoutContext } from "../../components/Layouts/FormLayout/FormLayout";
import { LoaderCircle } from "lucide-react";

function AddCpf() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<FormLayoutContext>();

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCpf(value);
  };

  async function fetchUpdateCpf(payload: CpfPayload) {
    setIsLoading(true);

    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "null");
      const response = await putUserCpf(user.id, payload);
      sessionStorage.setItem("user", JSON.stringify(response));
      navigate("/register/phone");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 400) {
          alert("CPF inválido. Por favor, verifique e tente novamente.");
        }
        if (parsedError.statusCode === 500) {
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
    const payload = {
      cpf: cpf,
    };
    fetchUpdateCpf(payload);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="flex flex-col gap-6 items-center justify-center min-h-[calc(100vh-88px)]">
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
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
      </Button>
      <button
        type="button"
        onClick={handleSkip}
        disabled={isLoading}
        className="text-typography-dark font-bold text-base py-2 w-full text-center cursor-pointer bg-transparent border-0 disabled:opacity-50"
      >
        Pular
      </button>
    </section>
  );
}

export default AddCpf;
