import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../components";
import { useEffect, useState } from "react";
import putUserPhone, { type PhonePayload } from "../../api/putUserPhone";
import type { FormLayoutContext } from "../../components/Layouts/FormLayout/FormLayout";
import { LoaderCircle } from "lucide-react";

function AddPhone() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<FormLayoutContext>();

  useEffect(() => {
    setTitle("Adicionar telefone");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
  };

  async function fetchUpdatePhone(payload: PhonePayload) {
    setIsLoading(true);

    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "null");
      const response = await putUserPhone(user.id, payload);
      sessionStorage.setItem("user", JSON.stringify(response));
      navigate("/register/cep");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 400) {
          alert("Telefone inválido. Por favor, verifique e tente novamente.");
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

  const handleContinue = () => {
    const payload = {
      phone: phone,
    };
    fetchUpdatePhone(payload);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Adicione seu telefone</Heading>
        <Input
          type="text"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="Digite seu telefone"
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
        <Button
          variant="secondary"
          onClick={handleSkip}
          fullWidth
          disabled={isLoading}
        >
          Pular
        </Button>
      </div>
    </section>
  );
}

export default AddPhone;
