import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type CepData = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
};

async function fetchCep(cep: string): Promise<CepData> {
  const cleanCep = cep.replace(/\D/g, "");
  const response = await fetch(
    `https://brasilapi.com.br/api/cep/v2/${cleanCep}`,
  );

  if (!response.ok) {
    throw new Error("CEP não encontrado. Por favor, verifique e tente novamente.");
  }

  const data = await response.json();
  return data;
}

function SearchCEP() {
  const navigate = useNavigate();
  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("/auth/register/phone");
  }, [setNavigationHistory]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCep(value);
  };

  const handleSearchCep = async () => {
    setIsLoading(true);

    try {
      const cepData = await fetchCep(cep);
      navigate("/auth/register/address", { state: { cepData } });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Erro ao buscar CEP. Por favor, tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Heading component="h1">Qual seu endereço</Heading>
          <p className="text-typography-base text-sm mt-2">
            Informe seu CEP para adicionar seu endereço.
          </p>
        </div>
        <Input
          type="text"
          name="cep"
          id="cep"
          label="CEP"
          placeholder="Digite seu CEP *"
          onChange={handleCepChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Button
          variant="primary"
          onClick={handleSearchCep}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Buscar endereço"
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

export default SearchCEP;
