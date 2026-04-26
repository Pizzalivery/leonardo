import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function SearchCEP() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Buscar CEP");
    setNavigationHistory("/auth/add-phone");
  }, []);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCep(value);
  };

  async function fetchCEP() {
    setIsLoading(true);

    try {
      const cepLimpo = cep.replace("-", "").replace(".", "");
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP");
      }

      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado. Por favor, tente novamente.");
        return;
      }

      navigate("/auth/address", {
        state: {
          cep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        },
      });
    } catch (error) {
      alert("Erro ao buscar CEP. Verifique o CEP e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSkip = () => {
    sessionStorage.setItem("hasAddress", "false");
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
          onClick={fetchCEP}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Buscar endereço"}
        </Button>
      </div>
      <p className="text-center text-typography-base text-base">
        <button
          onClick={handleSkip}
          className="text-brand-primary underline"
          disabled={isLoading}
        >
          Pular
        </button>
      </p>
    </section>
  );
}

export default SearchCEP;
