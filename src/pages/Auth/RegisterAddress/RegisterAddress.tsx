import { useNavigate, useLocation, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useState, useEffect } from "react";
import putUserAddress from "../../../api/postUserAddress";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type AddressState = {
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

  const addressState = (location.state as AddressState) || {};
  const { cep, street, neighborhood, city, state: uf } = addressState;

  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isNumeroValid = numero.trim() !== "";

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/cadastro/cep");
  }, []);

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumero(e.target.value);
  };

  const handleComplementoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplemento(e.target.value);
  };

  async function fetchAddress() {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    setIsLoading(true);

    try {
      await putUserAddress(user.id, {
        cep,
        state: uf,
        city,
        neighborhood,
        street,
        number: numero,
        complemento,
      });

      const fullAddress = `${street}, ${numero}${complemento ? `, ${complemento}` : ""}`;
      sessionStorage.setItem("userAddress", JSON.stringify(fullAddress));

      navigate("/", { state: { showAddress: true } });
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
    fetchAddress();
  };

  return (
    <section className="flex flex-col gap-6 py-6 h-[calc(100vh-88px)] overflow-y-auto">
      <div className="w-full text-center">
        <Heading component="h1">Estamos quase lá</Heading>
        <p className="text-typography-base text-sm mt-2">
          Confira o endereço e adicione o número, se tiver complemento adicione
          também.
        </p>
      </div>

      <span className="text-brand-primary text-sm font-semibold">
        CEP: {cep}
      </span>

      <Input
        type="text"
        name="street"
        id="street"
        label="Rua"
        placeholder="Rua"
        value={street ?? ""}
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
        value={neighborhood ?? ""}
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
            value={city ?? ""}
            fullWidth
            noLabel
            disabled
            onChange={() => {}}
          />
        </div>
        <div className="w-24">
          <Input
            type="text"
            name="uf"
            id="uf"
            label="UF"
            placeholder="UF"
            value={uf ?? ""}
            fullWidth
            noLabel
            disabled
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-32">
          <Input
            type="text"
            name="numero"
            id="numero"
            label="Número"
            placeholder="Número *"
            onChange={handleNumeroChange}
            fullWidth
            noLabel
            disabled={isLoading}
          />
        </div>
        <div className="flex-1">
          <Input
            type="text"
            name="complemento"
            id="complemento"
            label="Complemento"
            placeholder="Complemento"
            onChange={handleComplementoChange}
            fullWidth
            noLabel
            disabled={isLoading}
          />
        </div>
      </div>

      <Button
        variant="primary"
        onClick={handleConclude}
        fullWidth
        disabled={isLoading || !isNumeroValid}
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Concluir"}
      </Button>
    </section>
  );
}

export default RegisterAddress;
