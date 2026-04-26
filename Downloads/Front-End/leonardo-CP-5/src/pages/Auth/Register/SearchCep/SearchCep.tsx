import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../../components";
import { LoaderCircle } from "lucide-react";
import getViaCep from "../../../../api/getViaCep";
import type { AuthLayoutContext } from "../../../../components/Layouts/AuthLayout/AuthLayout";

function SearchCep() {
  const navigate = useNavigate();
  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("");
  }, [setNavigationHistory]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCep(value);
  };

  async function fetchViaCep(cepValue: string) {
    setIsLoading(true);

    try {
      const addressData = await getViaCep(cepValue);
      navigate("/auth/register/address", { state: addressData });
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 404) {
          alert("CEP não encontrado. Verifique e tente novamente.");
        } else {
          alert(
            "Ocorreu um erro ao buscar o CEP. Por favor, tente novamente.",
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearchAddress = () => {
    fetchViaCep(cep);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="flex flex-col gap-6 pt-8">
      <div className="flex flex-col gap-2 text-center">
        <Heading component="h1">Qual seu endereço</Heading>
        <p className="text-typography-base text-center">
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
        onClick={handleSkip}
        disabled={isLoading}
        className="w-full py-4 px-6 rounded-4xl font-black text-base text-typography-dark text-center cursor-pointer border-none bg-interface-disabled disabled:cursor-not-allowed disabled:opacity-80"
      >
        Pular
      </button>
    </section>
  );
}

export default SearchCep;
