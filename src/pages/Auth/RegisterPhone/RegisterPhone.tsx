import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { LoaderCircle } from "lucide-react";

import { Button, Heading, Input } from "../../../components";
import patchUserPhone from "../../../api/patchUserPhone";
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

function RegisterPhone() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/register/cpf");
  }, [setNavigationHistory, setTitle]);

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setPhone(value);
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

  async function fetchPhone() {
    const storedUser = getStoredUser();
    const userId = storedUser?.id;

    if (!phone.trim()) {
      alert("Digite seu telefone.");
      return;
    }

    setIsLoading(true);

    try {
      if (userId) {
        await patchUserPhone(userId, {
          phone,
        });
      }
    } catch {
      // continua o fluxo mesmo se a API falhar
    } finally {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          phone,
        }),
      );

      setIsLoading(false);
      navigate("/auth/register/cep");
    }
  }

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 min-h-[calc(100vh-88px)]">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading component="h1">Adicione seu telefone</Heading>
          <p className="max-w-[280px] text-sm text-typography-base">
            Adicione seu telefone para um canal de contato mais agilidade e
            praticidade.
          </p>
        </div>

        <Input
          type="text"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="DDD + Número *"
          value={phone}
          onChange={handlePhoneChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />

        <Button
          variant="primary"
          onClick={fetchPhone}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Continuar"
          )}
        </Button>

        <Button onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterPhone;