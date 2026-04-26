import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import patchUserCpf from "../../../api/patchUserCpf";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddCpf() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
   
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/register");
  }, [setTitle, setNavigationHistory]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    const formatted = digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(formatted);
  };

 
  async function fetchAddCpf() {
    setIsLoading(true);
    try {
      await patchUserCpf({ cpf });
      
      navigate("/auth/add-phone");
    } catch (error) {
      console.error("[AddCpf] Erro ao salvar CPF:", error);

      let statusCode = 0;
      if (error instanceof Error) {
        try {
          statusCode = JSON.parse(error.message)?.statusCode ?? 0;
        } catch {
        
        }
      }

      if (statusCode === 400) {
        alert("CPF inválido. Por favor, verifique.");
      } else if (statusCode === 401) {
        alert("Sessão expirada. Faça login novamente.");
        navigate("/auth/login");
      } else {
        alert("Erro ao salvar CPF. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) {
      alert("Por favor, informe um CPF válido com 11 dígitos.");
      return;
    }
    fetchAddCpf();
  };

  
  const handleSkip = () => navigate("/");

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-5 items-center justify-center w-full max-w-sm mx-auto sm:max-w-md">
        <div className="text-center w-full">
          <Heading component="h1">Parabéns! Sua conta foi criada</Heading>
          <p className="text-typography-base text-sm -mt-4">
            Finalize seu cadastro adicionando mais informações.
          </p>
        </div>

        <Input
          type="text"
          name="cpf"
          id="cpf"
          label="CPF"
          placeholder="Digite seu CPF *"
          value={cpf}
          onChange={handleCpfChange}
          fullWidth
          noLabel
          disabled={isLoading}
          maxLength={14}
          inputMode="numeric"
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
          className="text-typography-dark font-bold text-base py-2 w-full text-center cursor-pointer bg-transparent border-0"
        >
          Pular
        </button>
      </div>
    </section>
  );
}

export default AddCpf;
