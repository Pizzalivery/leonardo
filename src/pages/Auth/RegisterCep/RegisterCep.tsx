import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { LoaderCircle } from "lucide-react";

import { Button, Heading, Input } from "../../../components";
import getAddressByCep from "../../../api/getAddressByCep";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type StoredUser = {
  id?: string | number;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  address?: string;
  hasAddress?: boolean;
};

function RegisterCep() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/register/phone");
  }, [setNavigationHistory, setTitle]);

  function handleCepChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setCep(value);
  }

  function getStoredUser(): StoredUser | null {
    return JSON.parse(sessionStorage.getItem("user") || "null");
  }

  function handleSkip() {
    const storedUser = getStoredUser();

    if (storedUser) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          hasAddress: false,
        }),
      );
    }

    navigate("/");
  }

  async function fetchCep() {
    if (!cep.trim()) {
      alert("Digite seu CEP.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await getAddressByCep(cep);

      navigate("/auth/register/address", {
        state: {
          cep: response.cep,
          street: response.logradouro,
          neighborhood: response.bairro,
          city: response.localidade,
          state: response.uf,
          complement: response.complemento,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);
          alert(parsedError.message || "Não foi possível buscar o CEP.");
        } catch {
          alert("Não foi possível buscar o CEP.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 min-h-[calc(100vh-88px)]">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading component="h1">Qual seu endereço</Heading>
          <p className="max-w-[280px] text-sm text-typography-base">
            Informe seu CEP para adicionar seu endereço.
          </p>
        </div>

        <Input
          type="text"
          name="cep"
          id="cep"
          label="CEP"
          placeholder="Digite seu CEP *"
          value={cep}
          onChange={handleCepChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />

        <Button
          variant="primary"
          onClick={fetchCep}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Buscar endereço"
          )}
        </Button>

        <Button onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterCep;