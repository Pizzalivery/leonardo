import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import patchUserPhone from "../../../api/patchUserPhone";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddPhone() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
   
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/add-cpf");
  }, [setTitle, setNavigationHistory]);


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    const formatted = digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    setPhone(formatted);
  };


  async function fetchAddPhone() {
    setIsLoading(true);
    try {
      await patchUserPhone({ phone });
   
      navigate("/auth/search-cep");
    } catch (error) {
      console.error("[AddPhone] Erro ao salvar telefone:", error);

      let statusCode = 0;
      if (error instanceof Error) {
        try {
          statusCode = JSON.parse(error.message)?.statusCode ?? 0;
        } catch {
          
        }
      }

      if (statusCode === 400) {
        alert("Telefone inválido. Por favor, verifique.");
      } else if (statusCode === 401) {
        alert("Sessão expirada. Faça login novamente.");
        navigate("/auth/login");
      } else {
        alert("Erro ao salvar telefone. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      alert("Por favor, informe um telefone válido com DDD.");
      return;
    }
    fetchAddPhone();
  };

 
  const handleSkip = () => navigate("/");

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-5 items-center justify-center w-full max-w-sm mx-auto sm:max-w-md">
        <div className="text-center w-full">
          <Heading component="h1">Adicione seu telefone</Heading>
          <p className="text-typography-base text-sm -mt-4">
            Adicione seu telefone para um canal de contato mais agilidade e
            praticidade.
          </p>
        </div>

        <Input
          type="tel"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="DDD + Número *"
          value={phone}
          onChange={handlePhoneChange}
          fullWidth
          noLabel
          disabled={isLoading}
          maxLength={15}
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

export default AddPhone;
