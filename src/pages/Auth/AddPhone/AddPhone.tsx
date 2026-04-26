import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import postUserPhone, { type PhonePayload } from "../../../api/postUserPhone";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddPhone() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Adicionar Telefone");
    setNavigationHistory("/auth/add-cpf");
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
  };

  async function fetchAddPhone(payload: PhonePayload) {
    setIsLoading(true);

    try {
      await postUserPhone(payload);
      navigate("/auth/search-cep");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 400) {
          alert("Telefone inválido. Por favor, tente novamente.");
        }
        if (parsedError.statusCode === 500) {
          alert("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    const payload = {
      phone: phone,
    };
    fetchAddPhone(payload);
  };

  const handleSkip = () => {
    sessionStorage.setItem("hasAddress", "false");
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Adicionar Telefone</Heading>
        <Input
          type="tel"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="Seu telefone"
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
      </div>
      <p className="text-center text-typography-base text-base">
        <button
          onClick={handleSkip}
          className="text-brand-primary underline"
          disabled={isLoading}
        >
          Pular
        </button>
      </p>
    </section>
  );
}

export default AddPhone;
