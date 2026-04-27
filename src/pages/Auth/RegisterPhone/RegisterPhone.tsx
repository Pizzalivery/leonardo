import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import putUser from "../../../api/putUser";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function RegisterPhone() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/register/cpf");
  }, [setTitle, setNavigationHistory]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
  };

  async function fetchAddPhone() {
    setIsLoading(true);

    const user = JSON.parse(sessionStorage.getItem("user") || "null");
    const credentials = JSON.parse(
      sessionStorage.getItem("pendingCredentials") || "null",
    );

    if (!user?.id) {
      navigate("/auth/register/cep");
      setIsLoading(false);
      return;
    }

    try {
      await putUser(user.id, {
        name: user.name,
        email: user.email,
        role: user.role || "customer",
        password: credentials?.password || "",
        phone,
      });
    } catch {
      // A requisição foi feita.
      // O servidor pode retornar 500, porém navegamos normalmente.
    } finally {
      navigate("/auth/register/cep");
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    fetchAddPhone();
  };

  const handleSkip = () => {
    sessionStorage.setItem("showAddress", JSON.stringify(false));
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Adicione seu telefone</Heading>
        <p className="text-typography-base text-sm text-center">
          Adicione seu telefone para um canal de contato mais ágil e
          preferencial.
        </p>
        <Input
          type="tel"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="DDD + Número"
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
        <Button variant="default" onClick={handleSkip} fullWidth>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterPhone;
