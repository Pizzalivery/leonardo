import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import putUserAddress, {
  type UpdateAddressPayload,
} from "../../../api/putUserAddress";

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
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const addressState = (location.state || {}) as AddressState;

  const [cep] = useState(addressState.cep || "");
  const [street] = useState(addressState.street || "");
  const [neighborhood] = useState(
    addressState.neighborhood || "",
  );
  const [city] = useState(addressState.city || "");
  const [state] = useState(addressState.state || "");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Estamos quase la");
    setNavigationHistory("/register/cep");
  }, [setTitle, setNavigationHistory]);

  useEffect(() => {
    if (!addressState.cep) {
      navigate("/register/cep");
    }
  }, [addressState.cep, navigate]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleComplementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComplement(value);
  };

  const getStoredToken = () => {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      return null;
    }

    try {
      return JSON.parse(storedToken);
    } catch {
      return storedToken;
    }
  };

  const getStoredUser = () => {
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      return typeof parsedUser === "string" ? JSON.parse(parsedUser) : parsedUser;
    } catch {
      return null;
    }
  };

  const persistAddressLocally = (payload: UpdateAddressPayload) => {
    sessionStorage.setItem(
      "userAddress",
      JSON.stringify(`${payload.street}, ${payload.number}`),
    );

    const user = getStoredUser();

    if (user) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          address: payload,
        }),
      );
    }

    sessionStorage.removeItem("hideAddress");
  };

  const handleFinish = () => {
    const userData = getStoredUser();

    if (!userData?.id) {
      alert("Usuario nao encontrado. Tente novamente.");
      navigate("/register");
      return;
    }

    if (!number) {
      alert("Informe o numero do endereco.");
      return;
    }

    const payload: UpdateAddressPayload = {
      cep,
      street,
      number,
      neighborhood,
      city,
      state,
      complement: complement || undefined,
    };

    if (!getStoredToken()) {
      persistAddressLocally(payload);
      navigate("/");
      return;
    }

    updateAddress(userData.id, payload);
  };

  async function updateAddress(userId: string, payload: UpdateAddressPayload) {
    setIsLoading(true);

    try {
      await putUserAddress(userId, payload);
      persistAddressLocally(payload);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);

          if (parsedError.statusCode === 401) {
            persistAddressLocally(payload);
            navigate("/");
            return;
          }
        } catch {
          console.error("Erro ao salvar endereco:", error);
        }
      }

      persistAddressLocally(payload);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Heading component="h1">Estamos quase la</Heading>
          <p className="text-typography-base text-base">
            Confira o endereco e adicione o numero, se tiver complemento
            adicione tambem.
          </p>
        </div>
        <p className="text-typography-base text-base w-full">
          CEP: <span className="text-brand-primary">{cep}</span>
        </p>
        <Input
          type="text"
          name="street"
          id="street"
          label="Rua"
          placeholder="Rua"
          fullWidth
          noLabel
          disabled
          value={street}
          onChange={() => {}}
        />
        <div className="grid grid-cols-2 gap-4 w-full">
          <Input
            type="text"
            name="number"
            id="number"
            label="Numero"
            placeholder="Numero *"
            onChange={handleNumberChange}
            fullWidth
            noLabel
            disabled={isLoading}
            value={number}
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
            value={complement}
          />
        </div>
        <Input
          type="text"
          name="neighborhood"
          id="neighborhood"
          label="Bairro"
          placeholder="Bairro"
          fullWidth
          noLabel
          disabled
          value={neighborhood}
          onChange={() => {}}
        />
        <div className="grid grid-cols-2 gap-4 w-full">
          <Input
            type="text"
            name="city"
            id="city"
            label="Cidade"
            placeholder="Cidade"
            fullWidth
            noLabel
            disabled
            value={city}
            onChange={() => {}}
          />
          <Input
            type="text"
            name="state"
            id="state"
            label="UF"
            placeholder="UF"
            fullWidth
            noLabel
            disabled
            value={state}
            onChange={() => {}}
          />
        </div>
        <Button
          variant="primary"
          onClick={handleFinish}
          fullWidth
          disabled={isLoading}
        >
          Concluir
        </Button>
      </div>
    </section>
  );
}

export default Address;
