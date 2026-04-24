import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type AddressState = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

function Address() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const addressState = location.state as AddressState;

  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Endereço");
    setNavigationHistory("/auth/search-cep");
  }, [setTitle, setNavigationHistory]);

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleConclude = () => {
    setIsLoading(true);

    sessionStorage.setItem(
      "userAddress",
      `${addressState?.street || ""}, ${number}`
    );

    setIsLoading(false);
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 text-center">
          <Heading component="h1">Estamos quase lá</Heading>
          <p className="text-typography-base text-sm">
            Confira o endereço e adicione o número.
          </p>
        </div>

        <p className="w-full text-sm">
          CEP: <span className="text-brand-primary font-bold">{addressState?.cep}</span>
        </p>

        <Input
          type="text"
          name="street"
          id="street"
          label="Rua"
          placeholder="Rua"
          value={addressState?.street || ""}
          fullWidth
          noLabel
          disabled
        />

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Input
            type="text"
            name="number"
            id="number"
            label="Número"
            placeholder="Número *"
            onChange={handleNumberChange}
            disabled={isLoading}
          />

          <Input
            type="text"
            name="complement"
            id="complement"
            label="Complemento"
            placeholder="Complemento"
            disabled={isLoading}
          />
        </div>

        <Input
          type="text"
          name="neighborhood"
          id="neighborhood"
          label="Bairro"
          placeholder="Bairro"
          value={addressState?.neighborhood || ""}
          fullWidth
          noLabel
          disabled
        />

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Input
            type="text"
            name="city"
            id="city"
            label="Cidade"
            placeholder="Cidade"
            value={addressState?.city || ""}
            disabled
          />

          <Input
            type="text"
            name="state"
            id="state"
            label="Estado"
            placeholder="UF"
            value={addressState?.state || ""}
            disabled
          />
        </div>

        <Button
          variant="primary"
          onClick={handleConclude}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Concluir"}
        </Button>
      </div>
    </section>
  );
}

export default Address;