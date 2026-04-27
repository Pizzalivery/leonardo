import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import putUser from "../../../api/putUser";

function Phone() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Adicione seu telefone");
    setNavigationHistory("/register/cpf");
  }, [setTitle, setNavigationHistory]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
  };

  const getStoredToken = () => {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      return null;
    }

    try {
      return JSON.parse(storedToken);
    } catch {
      return storedToken;
    }
  };

  const getStoredUser = () => {
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      return typeof parsedUser === "string" ? JSON.parse(parsedUser) : parsedUser;
    } catch {
      return null;
    }
  };

  const persistPhoneLocally = (value: string) => {
    const user = getStoredUser();

    if (!user) {
      return;
    }

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        phone: value,
      }),
    );
  };

  async function updatePhone(userId: string, value: string) {
    setIsLoading(true);

    try {
      await putUser(userId, { phone: value });
      persistPhoneLocally(value);
      navigate("/register/cep");
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);

          if (parsedError.statusCode === 401) {
            persistPhoneLocally(value);
            navigate("/register/cep");
            return;
          }
        } catch {
          console.error("Erro ao salvar telefone:", error);
        }
      }

      alert("Nao foi possivel salvar o telefone. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    const userData = getStoredUser();
    const sanitizedPhone = phone.replace(/\D/g, "");

    if (!sanitizedPhone) {
      alert("Informe o telefone para continuar.");
      return;
    }

    if (!userData?.id) {
      alert("Usuario nao encontrado. Tente novamente.");
      navigate("/register");
      return;
    }

    if (!getStoredToken()) {
      persistPhoneLocally(sanitizedPhone);
      navigate("/register/cep");
      return;
    }

    updatePhone(userData.id, sanitizedPhone);
  };

  const handleSkip = () => {
    sessionStorage.setItem("hideAddress", "true");
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Heading component="h1">Adicione seu telefone</Heading>
          <p className="text-typography-base text-base">
            Adicione seu telefone para um canal de contato mais agilidade e
            praticidade.
          </p>
        </div>
        <Input
          type="text"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="DDD + Numero *"
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
          Continuar
        </Button>
        <Button onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default Phone;
