import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type ViaCepResponse = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

function RegisterCep() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();
  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isCepValid = cep.replace(/\D/g, "").length === 8;

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, []);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
  };

  async function fetchCep() {
    const cleanedCep = cep.replace(/\D/g, "");
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanedCep}/json/`,
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP.");
      }

      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        alert("CEP não encontrado. Por favor, verifique e tente novamente.");
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
  }

  const handleSearch = () => {
    fetchCep();
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="w-full text-center">
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
          onClick={handleSearch}
          fullWidth
          disabled={isLoading || !isCepValid}
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
