import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { LoaderCircle } from "lucide-react";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type ViaCepResponse = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function RegisterCep() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cleanedCep = onlyNumbers(cep);
  const isCepValid = cleanedCep.length === 8;

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCep(event.target.value);
  };

  const goHomeWithoutAddress = () => {
    sessionStorage.removeItem("userAddress");
    navigate("/", { state: { showAddress: false } });
  };

  const searchCep = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP");
      }

      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        alert("CEP não encontrado. Verifique o número digitado.");
        return;
      }

      navigate("/cadastro/endereco", {
        state: {
          cep: data.cep,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        },
      });
    } catch {
      alert("Erro ao buscar endereço. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!isCepValid) {
      alert("Digite um CEP válido com 8 números.");
      return;
    }

    searchCep();
  };

  const handleSkip = () => {
    goHomeWithoutAddress();
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="w-full text-center">
          <Heading component="h1">Qual seu endereço?</Heading>
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
          onClick={handleSearch}
          fullWidth
          disabled={isLoading || !isCepValid}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Buscar endereço"}
        </Button>

        <Button variant="default" onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterCep;
