import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";

import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type AddressState = {
  cep?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  complement?: string;
};

type StoredUser = {
  id?: string | number;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  address?: string;
  hasAddress?: boolean;
};

function RegisterAddress() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const addressState = (location.state || {}) as AddressState;

  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState(addressState.complement || "");

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/register/cep");
  }, [setNavigationHistory, setTitle]);

  function getStoredUser(): StoredUser | null {
    return JSON.parse(sessionStorage.getItem("user") || "null");
  }

  function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setNumber(value);
  }

  function handleComplementChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setComplement(value);
  }

  function handleFinish() {
    const storedUser = getStoredUser();

    if (!number.trim()) {
      alert("Digite o número do endereço.");
      return;
    }

    const fullAddress = `${addressState.street || ""}, ${number} - ${
      addressState.neighborhood || ""
    }, ${addressState.city || ""} - ${addressState.state || ""}, CEP ${
      addressState.cep || ""
    }${complement ? `, ${complement}` : ""}`;

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        ...storedUser,
        address: fullAddress,
        hasAddress: true,
      }),
    );

    navigate("/");
  }

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 min-h-[calc(100vh-88px)]">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading component="h1">Estamos quase lá</Heading>
          <p className="max-w-[280px] text-sm text-typography-base">
            Confira o endereço e adicione o número, se tiver complemento adicione
            também.
          </p>
        </div>

        <div className="w-full text-left text-sm text-typography-base">
          <span className="font-medium">CEP:</span>{" "}
          <span className="text-primary-base">{addressState.cep}</span>
        </div>

        <Input
          type="text"
          name="street"
          id="street"
          label="Rua"
          placeholder="Rua"
          value={addressState.street || ""}
          fullWidth
          noLabel
          disabled
        />

        <div className="grid grid-cols-2 gap-3 w-full">
          <Input
            type="text"
            name="number"
            id="number"
            label="Número"
            placeholder="Número *"
            value={number}
            onChange={handleNumberChange}
            fullWidth
            noLabel
          />

          <Input
            type="text"
            name="complement"
            id="complement"
            label="Complemento"
            placeholder="Complemento"
            value={complement}
            onChange={handleComplementChange}
            fullWidth
            noLabel
          />
        </div>

        <Input
          type="text"
          name="neighborhood"
          id="neighborhood"
          label="Bairro"
          placeholder="Bairro"
          value={addressState.neighborhood || ""}
          fullWidth
          noLabel
          disabled
        />

        <div className="grid grid-cols-[1fr_72px] gap-3 w-full">
          <Input
            type="text"
            name="city"
            id="city"
            label="Cidade"
            placeholder="Cidade"
            value={addressState.city || ""}
            fullWidth
            noLabel
            disabled
          />

          <Input
            type="text"
            name="state"
            id="state"
            label="Estado"
            placeholder="UF"
            value={addressState.state || ""}
            fullWidth
            noLabel
            disabled
          />
        </div>

        <Button variant="primary" onClick={handleFinish} fullWidth>
          Concluir
        </Button>
      </div>
    </section>
  );
}

export default RegisterAddress;