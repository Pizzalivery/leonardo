import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useState, useEffect } from "react";
import putUserPhone from "../../../api/postUserPhone";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function RegisterPhone() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isPhoneValid = phone.replace(/\D/g, "").length >= 10;

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  async function fetchPhone() {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    setIsLoading(true);

    try {
      await putUserPhone(user.id, phone.replace(/\D/g, ""));
      navigate("/cadastro/cep");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 500) {
          alert(
            "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
          );
        } else {
          alert("Erro ao salvar telefone. Por favor, tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    fetchPhone();
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="w-full text-center">
          <Heading component="h1">Adicione seu telefone</Heading>
          <p className="text-typography-base text-sm mt-2">
            Adicione seu telefone para um canal de contato com mais agilidade e
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
          disabled={isLoading || !isPhoneValid}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
        </Button>
        <button
          onClick={handleSkip}
          className="text-typography-base text-sm underline bg-transparent border-0 cursor-pointer"
        >
          Pular
        </button>
      </div>
    </section>
  );
}

export default RegisterPhone;
