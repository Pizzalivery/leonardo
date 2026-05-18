import { useLocation, useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import type { Address, AddressParams, UpdateAccount } from "../../../types";
import putUpdateAddress from "../../../api/putUpdateAddress";
import { useStorage } from "../../../hooks/useStorage";

function AddAddress() {
  const navigate = useNavigate();
  const location = useLocation();
  const [setStorageValue] = useStorage<string | null>("user", null);

  const { addressData } = location.state as { addressData: Address };

  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [user, setUser] = useState<UpdateAccount | null>(null);
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAddAddress(payload: AddressParams) {
    setIsLoading(true);

    try {
      const response = await putUpdateAddress(payload);

      if (response) {
        setStorageValue(response);
        // sessionStorage.setItem("user", JSON.stringify(response));

        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 401) {
          alert("Email ou senha incorretos. Por favor, tente novamente.");
        }
        if (parsedError.statusCode === 500) {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleChangeComplement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplement(e.target.value);
  };

  const handleSearchAddress = () => {
    const payload = {
      id: user?.id || "",
      address: {
        cep: addressData.cep,
        street: addressData.street,
        neighborhood: addressData.neighborhood,
        city: addressData.city,
        state: addressData.state,
        number: number,
      },
    };
    fetchAddAddress(payload);
  };

  useEffect(() => {
    setTitle("");
    setNavigationHistory("/register/search-address");
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Heading component="h1">Estamos quase lá</Heading>

          <p className="text-center text-typography-base text-base">
            Confira o endereço e adicione o número, se tiver complemento
            adicione também.
          </p>
        </div>
        <div className="w-full">
          <p className="text-typography-base mb-2">
            CEP:{" "}
            <span className="text-brand-primary font-bold">
              {addressData.cep}
            </span>
          </p>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              name="street"
              id="street"
              label="Rua"
              placeholder="Digite o nome da rua"
              fullWidth
              noLabel
              value={addressData.street}
              disabled={isLoading || Boolean(addressData.street)}
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  name="number"
                  id="number"
                  label="Número"
                  placeholder="Número"
                  onChange={handleChangeNumber}
                  fullWidth
                  noLabel
                  disabled={isLoading}
                />
              </div>
              <div className="flex-none">
                <Input
                  type="text"
                  name="complement"
                  id="complement"
                  label="Complemento"
                  placeholder="Complemento"
                  onChange={handleChangeComplement}
                  fullWidth
                  noLabel
                  disabled={isLoading}
                />
              </div>
            </div>
            <Input
              type="text"
              name="neighborhood"
              id="neighborhood"
              label="Bairro"
              placeholder="Digite o nome do bairro"
              fullWidth
              noLabel
              value={addressData.neighborhood}
              disabled={isLoading || !!addressData.neighborhood}
            />
            <div className="flex gap-2">
              <div className="flex-none">
                <Input
                  type="text"
                  name="city"
                  id="city"
                  label="Cidade"
                  placeholder="Digite o nome da cidade"
                  fullWidth
                  noLabel
                  value={addressData.city}
                  disabled={isLoading || !!addressData.city}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  name="state"
                  id="state"
                  label="Estado"
                  placeholder="Digite o nome do estado"
                  fullWidth
                  noLabel
                  value={addressData.state}
                  disabled={isLoading || !!addressData.state}
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={handleSearchAddress}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Concluir"}
        </Button>
      </div>
    </section>
  );
}

export default AddAddress;
