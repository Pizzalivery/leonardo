import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router";
import { Button, Heading, Input } from "../../components";
import updateAddressApi, { type UpdateAddressPayload } from "../../api/patchUserAddress";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../components/Layouts/AuthLayout/AuthLayout";

type AddressInfo = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

function RegisterAddress() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const address = state?.addressData as AddressInfo;

  const [houseNumber, setHouseNumber] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("/register/cep");
  }, [setNavigationHistory]);

  const onNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHouseNumber(event.target.value);
  };

  const onComplementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtraInfo(event.target.value);
  };

  const persistUserAddressLocally = () => {
    const stored = sessionStorage.getItem("user");
    const parsedUser = stored ? JSON.parse(stored) : {};

    const updated = {
      ...parsedUser,
      address: `${address.street}, ${houseNumber}`,
    };

    sessionStorage.setItem("user", JSON.stringify(updated));
  };

  const sendAddressToApi = async (data: UpdateAddressPayload) => {
    setLoading(true);
    try {
      await updateAddressApi(data);
      persistUserAddressLocally();
      navigate("/");
    } catch {
      alert("Erro ao salvar endereço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    const token = sessionStorage.getItem("userToken");

    const tokenValido =
      token &&
      token !== '"undefined"' &&
      token !== "undefined" &&
      token !== "null";

    if (!tokenValido) {
      persistUserAddressLocally();
      navigate("/");
      return;
    }

    const requestBody: UpdateAddressPayload = {
      street: address.street,
      number: houseNumber,
      complement: extraInfo,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      zipCode: address.cep,
    };

    sendAddressToApi(requestBody);
  };

  return (
    <section className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2 text-center">
        <Heading component="h1">Estamos quase lá</Heading>
        <p className="text-typography-base text-sm">
          Confira o endereço e adicione o número. Se tiver complemento, adicione também.
        </p>

        {address && (
          <p className="text-light text-sm text-left">
            CEP: 
            <span className="text-brand-primary font-bold" > {address.cep}</span>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="street"
          id="street"
          label=""
          placeholder="Rua"
          value={address?.street || ""}
          fullWidth
          disabled
        />

        <div className="flex gap-4">
          <Input
            type="text"
            name="number"
            id="number"
            label=""
            placeholder="Número *"
            onChange={onNumberChange}
            disabled={loading}
          />

          <Input
            type="text"
            name="complement"
            id="complement"
            label=""
            placeholder="Complemento"
            onChange={onComplementChange}
            disabled={loading}
          />
        </div>

        <Input
          type="text"
          name="neighborhood"
          id="neighborhood"
          label=""
          placeholder="Bairro"
          value={address?.neighborhood || ""}
          fullWidth
          disabled
        />

        <div className="flex gap-4">
          <Input
            type="text"
            name="city"
            id="city"
            label=""
            placeholder="Cidade"
            value={address?.city || ""}
            disabled
          />

          <Input
            type="text"
            name="state"
            id="state"
            label=""
            placeholder="UF"
            value={address?.state || ""}
            disabled
          />
        </div>
      </div>

      <Button
        variant="primary"
        onClick={handleFinish}
        fullWidth
        disabled={loading}
      >
        {loading ? <LoaderCircle className="animate-spin" /> : "Concluir"}
      </Button>
    </section>
  );
}

export default RegisterAddress;