import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import getAddressByCep from "../../../api/getAddressByCep";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function SearchCep() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Buscar CEP");
    setNavigationHistory("/auth/add-phone");
  }, [setTitle, setNavigationHistory]);

  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
  };

  const fetchAddressByCep = async () => {
    setIsLoading(true);

    try {
      const addressData = await getAddressByCep(cep);

      navigate("/auth/address", {
        state: {
          cep: addressData.cep,
          street: addressData.logradouro,
          neighborhood: addressData.bairro,
          city: addressData.localidade,
          state: addressData.uf,
        },
      });
    } catch (error) {
      console.error(error);
      alert("CEP não encontrado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchCep = () => {
    fetchAddressByCep();
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 text-center">
          <Heading component="h1">Qual seu endereço</Heading>
          <p className="text-typography-base text-sm">
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
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Buscar endereço"}
        </Button>

        <Button
          variant="default"
          onClick={handleSkip}
          fullWidth
          disabled={isLoading}
          className="!bg-mix-interface-border-light"
        >
          Pular
        </Button>
      </div>
    </section>
  );
}

export default SearchCep;