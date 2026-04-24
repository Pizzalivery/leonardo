import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { LoaderCircle } from "lucide-react";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import postUserAddress from "../../../api/postUserAddress";

type AddressState = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

function getLoggedUser() {
  return JSON.parse(sessionStorage.getItem("user") || "{}");
}

function RegisterAddress() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const address = (location.state || {}) as AddressState;
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isNumberValid = number.trim() !== "";

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/cadastro/cep");
  }, [setTitle, setNavigationHistory]);

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const saveAddressInSession = () => {
    const fullAddress = `${address.street}, ${number} - ${address.neighborhood}, ${address.city} - ${address.state}`;
    sessionStorage.setItem("userAddress", JSON.stringify(fullAddress));
  };

  const finishAddress = async () => {
    const user = getLoggedUser();
    setIsLoading(true);

    try {
      await postUserAddress(user.id, {
        cep: address.cep,
        street: address.street,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        number,
      });

      saveAddressInSession();
      navigate("/", { state: { showAddress: true } });
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 500) {
          alert("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
        } else {
          alert("Erro ao salvar endereço. Por favor, tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConclude = () => {
    if (!isNumberValid) return;
    finishAddress();
  };

  return (
    <section className="flex flex-col gap-6 py-6 h-[calc(100vh-88px)] overflow-y-auto">
      <div className="w-full text-center">
        <Heading component="h1">Estamos quase lá</Heading>
        <p className="text-typography-base text-sm mt-2">
          Confira os dados do endereço e informe apenas o número.
        </p>
      </div>

      <span className="text-brand-primary text-sm font-semibold">CEP: {address.cep}</span>

      <Input
        type="text"
        name="street"
        id="street"
        label="Rua"
        placeholder="Rua"
        value={address.street ?? ""}
        fullWidth
        noLabel
        disabled
        onChange={() => {}}
      />

      <Input
        type="text"
        name="neighborhood"
        id="neighborhood"
        label="Bairro"
        placeholder="Bairro"
        value={address.neighborhood ?? ""}
        fullWidth
        noLabel
        disabled
        onChange={() => {}}
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="text"
            name="city"
            id="city"
            label="Cidade"
            placeholder="Cidade"
            value={address.city ?? ""}
            fullWidth
            noLabel
            disabled
            onChange={() => {}}
          />
        </div>

        <div className="w-24">
          <Input
            type="text"
            name="state"
            id="state"
            label="UF"
            placeholder="UF"
            value={address.state ?? ""}
            fullWidth
            noLabel
            disabled
            onChange={() => {}}
          />
        </div>
      </div>

      <Input
        type="text"
        name="number"
        id="number"
        label="Número"
        placeholder="Número *"
        onChange={handleNumberChange}
        fullWidth
        noLabel
        disabled={isLoading}
      />

      <Button
        variant="primary"
        onClick={handleConclude}
        fullWidth
        disabled={isLoading || !isNumberValid}
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Concluir"}
      </Button>
    </section>
  );
}

export default RegisterAddress;
