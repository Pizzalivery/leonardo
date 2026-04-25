import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router";
import { Button, Heading, Input } from "../../components";
import patchUserAddress, { type UpdateAddressPayload, } from "../../api/patchUserAddress";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../components/Layouts/AuthLayout/AuthLayout";

type AddressData = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

function RegisterAddress() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const addressData = location.state?.addressData as AddressData;

  useEffect(() => {
    if (!addressData) {
        navigate("/register/cep");
    }
  }, [addressData, navigate]);

    if (!addressData) return null;

  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/register/cep");
  }, [setTitle, setNavigationHistory]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleComplementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComplement(value);
  };

  async function fetchUpdateAddress(payload: UpdateAddressPayload) {
    setIsLoading(true);
    try {
      await patchUserAddress(payload);

      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      const updatedUser = {
        ...user,
        address: `${addressData.street}, ${number}`,
      };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao salvar endereço. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleConclude = () => {
    const token = sessionStorage.getItem("userToken");
    const hasToken =
      token &&
      token !== '"undefined"' &&
      token !== "undefined" &&
      token !== "null";

    if (!hasToken) {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      const updatedUser = {
        ...user,
        address: `${addressData.street}, ${number}`,
      };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/");
      return;
    }

    const payload: UpdateAddressPayload = {
      street: addressData.street,
      number,
      complement,
      neighborhood: addressData.neighborhood,
      city: addressData.city,
      state: addressData.state,
      zipCode: addressData.cep,
    };
    fetchUpdateAddress(payload);
  };

  return (
    <section className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <Heading component="h1">Estamos quase lá</Heading>
        <p className="text-typography-base text-sm">
          Confira o endereço e adicione o número. Se tiver complemento, adicione
          também.
        </p>
        {addressData && (
          <p className="text-brand-primary text-sm font-bold">
            CEP: {addressData.cep}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="street"
          id="street"
          label="Rua"
          placeholder="Rua"
          value={addressData?.street || ""}
          fullWidth
          disabled
        />
        <div className="flex gap-4">
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
            onChange={handleComplementChange}
            disabled={isLoading}
          />
        </div>
        <Input
          type="text"
          name="neighborhood"
          id="neighborhood"
          label="Bairro"
          placeholder="Bairro"
          value={addressData?.neighborhood || ""}
          fullWidth
          disabled
        />
        <div className="flex gap-4">
          <Input
            type="text"
            name="city"
            id="city"
            label="Cidade"
            placeholder="Cidade"
            value={addressData?.city || ""}
            disabled
          />
          <Input
            type="text"
            name="state"
            id="state"
            label="UF"
            placeholder="UF"
            value={addressData?.state || ""}
            disabled
          />
        </div>
      </div>

      <Button
        variant="primary"
        onClick={handleConclude}
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Concluir"}
      </Button>
    </section>
  );
}

export default RegisterAddress;