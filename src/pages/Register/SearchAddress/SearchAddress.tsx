import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useEffect, useState } from "react";
import getCEP from "../../../api/getCEP";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import type { SearchCep } from "../../../types";

function SearchAddress() {
  const navigate = useNavigate();

  const { setTitle } = useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchSearchAddress(payload: SearchCep) {
    setIsLoading(true);

    try {
      const response = await getCEP(payload);

      if (response) {
        navigate("/register/add-address", { state: { addressData: response } });
      }
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 401) {
          alert("Email ou senha incorretos. Por favor, tente novamente.");
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

  const handleChangeCep = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
  };

  const handleSearchAddress = () => {
    const payload = {
      cep: cep,
    };
    fetchSearchAddress(payload);
  };

  const handleSkip = () => {
    navigate("/");
  };

  useEffect(() => {
    setTitle("");
  }, []);

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Heading component="h1">Qual seu endereço?</Heading>

          <p className="text-center text-typography-base text-base">
            Informe seu CEP para adicionar seu endereço.
          </p>
        </div>
        <Input
          type="text"
          name="cep"
          id="cep"
          label="CEP"
          placeholder="00000-000"
          onChange={handleChangeCep}
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
        <Button onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default SearchAddress;
