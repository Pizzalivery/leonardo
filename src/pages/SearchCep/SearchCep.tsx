import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../components";
import { useEffect, useState } from "react";
import getCepAddress from "../../api/getCepAddress";
import type { FormLayoutContext } from "../../components/Layouts/FormLayout/FormLayout";
import { LoaderCircle } from "lucide-react";

function SearchCep() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<FormLayoutContext>();

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCep(value);
  };

  async function fetchAddress(cepValue: string) {
    setIsLoading(true);

    try {
      const response = await getCepAddress(cepValue);
      navigate("/register/address", { state: { address: response } });
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 404) {
          alert("CEP não encontrado.");
        } else {
          alert("Erro ao buscar o CEP. Por favor, tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearchAddress = () => {
    fetchAddress(cep);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="flex flex-col gap-6 items-center justify-center min-h-[calc(100vh-88px)]">
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
        disabled={isLoading}
        className="bg-interface-disabled text-typography-base font-bold text-base py-4 w-full text-center rounded-4xl cursor-pointer border-0 disabled:opacity-50"
      >
        Pular
      </button>
    </section>
  );
}

export default SearchCep;
