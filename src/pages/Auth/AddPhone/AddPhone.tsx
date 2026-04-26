import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import patchUserPhone, { type PhonePayload } from "../../../api/patchUserPhone";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddPhone() {
  const navigate = useNavigate();
  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("/auth/register/cpf");
  }, [setNavigationHistory]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
  };

  async function fetchAddPhone(id: string, payload: PhonePayload) {
    setIsLoading(true);

    try {
      await patchUserPhone(id, payload);
      navigate("/auth/register/cep");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 500) {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        } else {
          alert("Erro ao adicionar telefone. Por favor, tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    const user = JSON.parse(sessionStorage.getItem("user") as string);

    const payload: PhonePayload = { phone };
    fetchAddPhone(user.id, payload);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Heading component="h1">Adicione seu telefone</Heading>
          <p className="text-typography-base text-sm mt-2">
            Adicione seu telefone para um canal de contato mais agilidade e
            praticidade.
          </p>
        </div>
        <Input
          type="tel"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="DDD - Número"
          onChange={handlePhoneChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Button
          variant="primary"
          onClick={handleContinue}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Continuar"
          )}
        </Button>
        <button
          onClick={handleSkip}
          className="text-typography-base text-sm underline cursor-pointer"
        >
          Pular
        </button>
      </div>
    </section>
  );
}

export default AddPhone;
