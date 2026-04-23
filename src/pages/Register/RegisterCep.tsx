import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../components";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../components/Layouts/AuthLayout/AuthLayout";

type AddressInfo = {
  cep: string;
  street: string;
  city: string;
  state: string;
  neighborhood: string;
};

function RegisterCep() {
  const navigate = useNavigate();
  const { setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [zipCode, setZipCode] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("");
  }, [setNavigationHistory]);

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const getAddressFromCep = async () => {
    setLoading(true);
    try {
      const formattedCep = zipCode.replace(/\D/g, "");

      const request = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${formattedCep}`
      );

      if (!request.ok) {
        alert("CEP não encontrado.");
        return;
      }

      const result: AddressInfo = await request.json();

      navigate("/register/address", {
        state: { addressData: result },
      });
    } catch {
      alert("Erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    getAddressFromCep();
  };

  const handleSkipStep = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Qual seu endereço</Heading>

        <p className="text-typography-base text-base text-center">
          Informe seu CEP para adicionar seu endereço.
        </p>

        <Input
          type="text"
          name="cep"
          id="cep"
          label="CEP"
          placeholder="Digite seu CEP"
          onChange={handleZipChange}
          fullWidth
          noLabel
          disabled={loading}
        />

        <Button
          variant="primary"
          onClick={handleSearch}
          fullWidth
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Buscar endereço"
          )}
        </Button>
        <Button onClick={handleSkipStep} disabled={loading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterCep;