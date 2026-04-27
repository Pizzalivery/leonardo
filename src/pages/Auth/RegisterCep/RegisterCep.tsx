import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

export type AddressData = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
};

function RegisterCep() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/register/phone");
  }, [setTitle, setNavigationHistory]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCep(value);
  };

  async function fetchAddressByCep(cepValue: string) {
    setIsLoading(true);

    const cleanedCep = cepValue.replace(/\D/g, "");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanedCep}/json/`,
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP.");
      }

      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado. Por favor, verifique e tente novamente.");
        return;
      }

      const addressData: AddressData = {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        cep: cleanedCep,
      };

      navigate("/auth/register/address", { state: { addressData } });
    } catch (error) {
      alert(
        "Ocorreu um erro ao buscar o CEP. Por favor, tente novamente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearchAddress = () => {
    fetchAddressByCep(cep);
  };

  const handleSkip = () => {
    sessionStorage.setItem("showAddress", JSON.stringify(false));
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
          maxLength={9}
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
        <Button variant="default" onClick={handleSkip} fullWidth>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterCep;
