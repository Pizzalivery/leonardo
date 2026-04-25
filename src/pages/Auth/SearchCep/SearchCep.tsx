import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";

function SearchCep() {
  const navigate = useNavigate();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCep(value);
  };

  async function fetchCep() {
    setIsLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado. Verifique e tente novamente.");
        return;
      }

      navigate("/register/address", {
        state: {
          cep: data.cep.replace("-", ""),
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        },
      });
    } catch {
      alert("Erro ao buscar CEP. Tente novamente mais tarde.");
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
        <Heading component="h1">Buscar CEP</Heading>
        <Input
          type="text"
          name="cep"
          id="cep"
          label="CEP"
          placeholder="Seu CEP"
          onChange={handleCepChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Button
          variant="primary"
          onClick={handleSearch}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Buscar endereço"}
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