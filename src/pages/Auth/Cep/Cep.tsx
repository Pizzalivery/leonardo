import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import getCep from "../../../api/getCep";

function Cep() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Qual seu endereco");
    setNavigationHistory("/register/phone");
  }, [setTitle, setNavigationHistory]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCep(value);
  };

  async function fetchCep() {
    setIsLoading(true);

    try {
      const response = await getCep(cep);
      navigate("/register/address", {
        state: {
          cep: response.cep,
          street: response.street,
          neighborhood: response.neighborhood,
          city: response.city,
          state: response.state,
        },
      });
    } catch (error) {
      alert("Nao foi possivel encontrar o CEP. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = () => {
    fetchCep();
  };

  const handleSkip = () => {
    sessionStorage.setItem("hideAddress", "true");
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Heading component="h1">Qual seu endereco</Heading>
          <p className="text-typography-base text-base">
            Informe seu CEP para adicionar seu endereco.
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
          disabled={isLoading}
        >
          Buscar endereco
        </Button>
        <Button onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default Cep;
