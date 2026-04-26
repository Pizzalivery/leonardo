import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router";
import { Button, Heading, Input } from "../../../components";
import patchUserAddress, {
  type AddressPayload,
} from "../../../api/patchUserAddress";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type CepData = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
};

function Address() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const cepData = (location.state as { cepData: CepData })?.cepData;

  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("/auth/register/cep");
  }, [setNavigationHistory]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleComplementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComplement(value);
  };

  async function fetchAddAddress(id: string, payload: AddressPayload) {
    setIsLoading(true);

    try {
      const updatedUser = await patchUserAddress(id, payload);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 500) {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        } else {
          alert("Erro ao salvar endereço. Por favor, tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleConclude = () => {
    const user = JSON.parse(sessionStorage.getItem("user") as string);

    const payload: AddressPayload = {
      street: cepData?.street ?? "",
      number,
      complement,
      neighborhood: cepData?.neighborhood ?? "",
      city: cepData?.city ?? "",
      state: cepData?.state ?? "",
      cep: cepData?.cep ?? "",
    };

    fetchAddAddress(user.id, payload);
  };

  return (
    <section className="flex flex-col gap-4 py-6">
      <div className="text-center mb-2">
        <Heading component="h1">Estamos quase lá</Heading>
        <p className="text-typography-base text-sm mt-2">
          Confira o endereço e adicione o número, se tiver complemento adicione
          também.
        </p>
      </div>

      {cepData && (
        <p className="text-sm">
          CEP{" "}
          <span className="text-brand-primary font-semibold">{cepData.cep}</span>
        </p>
      )}

      <Input
        type="text"
        name="street"
        id="street"
        label="Rua"
        placeholder="Rua"
        value={cepData?.street ?? ""}
        onChange={() => {}}
        fullWidth
        disabled
      />

      <div className="flex gap-3">
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
        value={cepData?.neighborhood ?? ""}
        onChange={() => {}}
        fullWidth
        disabled
      />

      <div className="flex gap-3">
        <Input
          type="text"
          name="city"
          id="city"
          label="Cidade"
          placeholder="Cidade"
          value={cepData?.city ?? ""}
          onChange={() => {}}
          disabled
        />
        <Input
          type="text"
          name="state"
          id="state"
          label="Estado"
          placeholder="Estado"
          value={cepData?.state ?? ""}
          onChange={() => {}}
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
    </section>
  );
}

export default Address;
