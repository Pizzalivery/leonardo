import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { LoaderCircle } from "lucide-react";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import postUserPhone from "../../../api/postUserPhone";

function getLoggedUser() {
  return JSON.parse(sessionStorage.getItem("user") || "{}");
}

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function RegisterPhone() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cleanedPhone = onlyNumbers(phone);
  const isPhoneValid = cleanedPhone.length >= 10;

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const goHomeWithoutAddress = () => {
    sessionStorage.removeItem("userAddress");
    navigate("/", { state: { showAddress: false } });
  };

  const savePhone = async () => {
    const user = getLoggedUser();
    setIsLoading(true);

    try {
      await postUserPhone(user.id, cleanedPhone);
      navigate("/cadastro/cep");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 500) {
          alert("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
        } else {
          alert("Erro ao salvar telefone. Por favor, tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (!isPhoneValid) return;
    savePhone();
  };

  const handleSkip = () => {
    goHomeWithoutAddress();
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="w-full text-center">
          <Heading component="h1">Adicione seu telefone</Heading>
          <p className="text-typography-base text-sm mt-2">
            Adicione seu telefone para um canal de contato com mais agilidade e praticidade.
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
          disabled={isLoading || !isPhoneValid}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
        </Button>

        <Button variant="default" onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterPhone;
