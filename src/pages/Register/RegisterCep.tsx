import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../components";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../components/Layouts/AuthLayout/AuthLayout";

type AddressData = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

function RegisterCep() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCep(value);
  };

  async function fetchCep() {
    setIsLoading(true);
    try {
      const cleanCep = cep.replace(/\D/g, "");
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${cleanCep}`
      );

      if (!response.ok) {
        alert("CEP não encontrado. Verifique e tente novamente.");
        return;
      }

      const data: AddressData = await response.json();
      navigate("/register/address", { state: { addressData: data } });
    } catch (error) {
      alert("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearchAddress = () => {
    fetchCep();
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Qual seu endereço</Heading>
        <p className="text-typography-base text-sm text-center">
          Informe seu CEP para adicionar seu endereço.
        </p>
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
      </div>
      <div className="flex justify-center">
        <Button onClick={handleSkip} disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterCep;