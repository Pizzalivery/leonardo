import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../components";
import patchUserCpf, { type UpdateCpfPayload } from "../../api/patchUserCpf";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../components/Layouts/AuthLayout/AuthLayout";

function RegisterCpf() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCpf(value);
  };

  async function fetchUpdateCpf(payload: UpdateCpfPayload) {
    setIsLoading(true);
    try {
      await patchUserCpf(payload);
      navigate("/register/phone");
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao salvar CPF. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  }

const handleContinue = () => {
  const token = sessionStorage.getItem("userToken");
  const hasToken = token && token !== '"undefined"' && token !== "undefined" && token !== "null";
  
  if (!hasToken) {
    navigate("/register/phone");
    return;
  }
  
  const payload = { cpf };
  fetchUpdateCpf(payload);
};

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Parabéns! Sua conta foi criada</Heading>
        <p className="text-typography-base text-sm text-center">
          Finalize seu cadastro adicionando mais informações.
        </p>
        <Input
          type="text"
          name="cpf"
          id="cpf"
          label="CPF"
          placeholder="Digite seu CPF"
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
      <div className="flex justify-center">
        <Button onClick={handleSkip} disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterCpf;