import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { putUserAddress } from "../../../api/putUser";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import type { AddressData } from "../RegisterCep/RegisterCep";

function RegisterAddress() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const addressData: AddressData = location.state?.addressData;

  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/register/cep");
  }, [setTitle, setNavigationHistory]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleComplementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComplement(value);
  };

  async function fetchSaveAddress() {
    setIsLoading(true);

    const user = JSON.parse(sessionStorage.getItem("user") || "null");
    const formattedAddress = `${addressData?.street || ""}, ${number}`;

    const saveAndNavigate = () => {
      sessionStorage.setItem("userAddress", JSON.stringify(formattedAddress));
      sessionStorage.setItem("showAddress", JSON.stringify(true));
      sessionStorage.removeItem("pendingCredentials");
      navigate("/");
    };

    if (!user?.id) {
      saveAndNavigate();
      setIsLoading(false);
      return;
    }

    try {
      await putUserAddress(user.id, {
        cep: addressData?.cep || "",
        street: addressData?.street || "",
        number,
        neighborhood: addressData?.neighborhood || "",
        city: addressData?.city || "",
        state: addressData?.state || "",
      });
    } catch {
      // avança mesmo com erro do servidor
    } finally {
      saveAndNavigate();
      setIsLoading(false);
    }
  }

  const handleConclude = () => {
    fetchSaveAddress();
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Estamos quase lá</Heading>
        <p className="text-typography-base text-sm text-center">
          Confirme o endereço e adicione o número, se tiver complemento,
          adicione também.
        </p>
        <Input
          type="text"
          name="street"
          id="street"
          label="Rua"
          placeholder="Rua"
          value={addressData?.street || ""}
          fullWidth
          noLabel
          disabled
          onChange={() => {}}
        />
        <div className="flex gap-4 w-full">
          <Input
            type="text"
            name="number"
            id="number"
            label="Número"
            placeholder="Número"
            onChange={handleNumberChange}
            fullWidth
            noLabel
            disabled={isLoading}
          />
          <Input
            type="text"
            name="complement"
            id="complement"
            label="Complemento"
            placeholder="Complemento"
            onChange={handleComplementChange}
            fullWidth
            noLabel
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
          noLabel
          disabled
          onChange={() => {}}
        />
        <div className="flex gap-4 w-full">
          <Input
            type="text"
            name="city"
            id="city"
            label="Cidade"
            placeholder="Cidade"
            value={addressData?.city || ""}
            fullWidth
            noLabel
            disabled
            onChange={() => {}}
          />
          <Input
            type="text"
            name="state"
            id="state"
            label="Estado"
            placeholder="Estado"
            value={addressData?.state || ""}
            fullWidth
            noLabel
            disabled
            onChange={() => {}}
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

export default RegisterAddress;
