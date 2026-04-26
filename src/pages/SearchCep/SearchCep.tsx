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
    setTitle("Buscar endereço");
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
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Buscar endereço</Heading>
        <Input
          type="text"
          name="cep"
          id="cep"
          label="CEP"
          placeholder="Digite seu CEP"
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
        <Button
          variant="secondary"
          onClick={handleSkip}
          fullWidth
          disabled={isLoading}
        >
          Pular
        </Button>
      </div>
    </section>
  );
}

export default SearchCep;
