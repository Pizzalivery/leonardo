import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../../components";
import { LoaderCircle } from "lucide-react";
import putUserAddress, {
  type AddressPayload,
} from "../../../../api/postUserAddress";
import type { ViaCepAddress } from "../../../../api/getViaCep";
import type { AuthLayoutContext } from "../../../../components/Layouts/AuthLayout/AuthLayout";

function Address() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const addressData = location.state as ViaCepAddress;

  const [numero, setNumero] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("");
  }, [setNavigationHistory]);

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumero(value);
  };

  async function fetchAddress(payload: AddressPayload) {
    setIsLoading(true);
    const rawToken = sessionStorage.getItem("userToken");
    const token =
      rawToken && rawToken !== "undefined" ? JSON.parse(rawToken) : null;

    const rawUser = sessionStorage.getItem("user");
    const storedUser =
      rawUser && rawUser !== "undefined" ? JSON.parse(rawUser) : null;
    const userId = storedUser?.id;

    try {
      await putUserAddress(userId, payload, token);
      const addressDisplay = `${addressData.logradouro}, ${numero}`;
      sessionStorage.setItem("userAddress", addressDisplay);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 400) {
          alert("Endereço inválido. Verifique e tente novamente.");
        } else {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleFinish = () => {
    // Map ViaCEP field names to the API's expected field names
    const payload: AddressPayload = {
      cep: addressData.cep,
      street: addressData.logradouro,
      number: numero,
      neighborhood: addressData.bairro,
      city: addressData.localidade,
      state: addressData.uf,
    };
    fetchAddress(payload);
  };

  return (
    <section className="flex flex-col gap-6 pt-8">
      <div className="flex flex-col gap-2">
        <Heading component="h1">Estamos quase lá</Heading>
        <p className="text-typography-base">
          Confira o endereço e adicione o número, se tiver complemento adicione
          também.
        </p>
      </div>

      <p className="text-typography-dark font-bold">
        CEP:{" "}
        <span className="text-brand-primary">{addressData?.cep}</span>
      </p>

      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="logradouro"
          id="logradouro"
          label="Logradouro"
          placeholder="Logradouro"
          value={addressData?.logradouro || ""}
          fullWidth
          noLabel
          disabled
        />

        <div className="flex gap-3">
          <div className="w-2/5">
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
              fullWidth
              noLabel
              disabled
            />
          </div>
        </div>

        <Input
          type="text"
          name="bairro"
          id="bairro"
          label="Bairro"
          placeholder="Bairro"
          value={addressData?.bairro || ""}
          fullWidth
          noLabel
          disabled
        />

        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              type="text"
              name="localidade"
              id="localidade"
              label="Cidade"
              placeholder="Cidade"
              value={addressData?.localidade || ""}
              fullWidth
              noLabel
              disabled
            />
          </div>
          <div className="w-1/4">
            <Input
              type="text"
              name="uf"
              id="uf"
              label="UF"
              placeholder="UF"
              value={addressData?.uf || ""}
              fullWidth
              noLabel
              disabled
            />
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        onClick={handleFinish}
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Concluir"}
      </Button>
    </section>
  );
}

export default Address;
