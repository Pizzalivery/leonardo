import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../../components";
import { LoaderCircle } from "lucide-react";
import putUserPhone, {
  type PhonePayload,
} from "../../../../api/patchUserPhone";
import type { AuthLayoutContext } from "../../../../components/Layouts/AuthLayout/AuthLayout";

function AddPhone() {
  const navigate = useNavigate();
  const { setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavigationHistory("");
  }, [setNavigationHistory]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
  };

  async function fetchPhone(payload: PhonePayload) {
    setIsLoading(true);
    const rawToken = sessionStorage.getItem("userToken");
    const token =
      rawToken && rawToken !== "undefined" ? JSON.parse(rawToken) : null;

    const rawUser = sessionStorage.getItem("user");
    const storedUser =
      rawUser && rawUser !== "undefined" ? JSON.parse(rawUser) : null;
    const userId = storedUser?.id;

    try {
      await putUserPhone(userId, payload, token);
      navigate("/auth/register/cep");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 400) {
          alert("Telefone inválido. Verifique e tente novamente.");
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

  const handleContinue = () => {
    const payload: PhonePayload = { phone };
    fetchPhone(payload);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="flex flex-col gap-6 pt-8">
      <div className="flex flex-col gap-2 text-center">
        <Heading component="h1">Adicione seu telefone</Heading>
        <p className="text-typography-base text-center">
          Adicione seu telefone para um canal de contato mais agilidade e
          praticidade.
        </p>
      </div>

      <Input
        type="tel"
        name="phone"
        id="phone"
        label="Telefone"
        placeholder="DDD + Número *"
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
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
      </Button>

      <button
        onClick={handleSkip}
        className="w-full py-2 font-black text-base text-typography-dark text-center cursor-pointer bg-transparent border-none"
      >
        Pular
      </button>
    </section>
  );
}

export default AddPhone;
