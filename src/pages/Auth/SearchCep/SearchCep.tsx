import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

export type CepAddressData = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};


const VIACEP_URL = "https://viacep.com.br/ws";

function SearchCep() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/add-phone");
  }, [setTitle, setNavigationHistory]);

  
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    const formatted = digits.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
    setCep(formatted);
  };

  
  async function fetchAddressByCep() {
    const rawCep = cep.replace(/\D/g, "");
    if (rawCep.length !== 8) {
      alert("Por favor, informe um CEP válido com 8 dígitos.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${VIACEP_URL}/${rawCep}/json/`);

      if (!response.ok) throw new Error("Resposta inválida da ViaCEP.");

      const data: CepAddressData & { erro?: boolean } = await response.json();

      if (data.erro) {
        alert("CEP não encontrado. Verifique e tente novamente.");
        return;
      }

     
      navigate("/auth/add-address", { state: { addressData: data } });
    } catch (error) {
      console.error("[SearchCep] Erro ao buscar CEP:", error);
      alert("Erro ao buscar endereço. Verifique sua conexão.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearchAddress = () => fetchAddressByCep();

  
  const handleSkip = () => navigate("/");

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-5 items-center justify-center w-full max-w-sm mx-auto sm:max-w-md">
        <div className="text-center w-full">
          <Heading component="h1">Qual seu endereço</Heading>
          <p className="text-typography-base text-sm -mt-4">
            Informe seu CEP para adicionar seu endereço.
          </p>
        </div>

        <Input
          type="text"
          name="cep"
          id="cep"
          label="CEP"
          placeholder="Digite seu CEP *"
          value={cep}
          onChange={handleCepChange}
          fullWidth
          noLabel
          disabled={isLoading}
          maxLength={9}
          inputMode="numeric"
        />

        <Button
          variant="primary"
          onClick={handleSearchAddress}
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
          type="button"
          onClick={handleSkip}
          className="bg-interface-disabled text-typography-base font-bold text-base py-4 w-full text-center rounded-4xl cursor-pointer border-0"
        >
          Pular
        </button>
      </div>
    </section>
  );
}

export default SearchCep;
