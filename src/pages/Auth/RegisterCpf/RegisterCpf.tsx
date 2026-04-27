import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import putUser from "../../../api/putUser";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function RegisterCpf() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCpf(value);
  };

  async function fetchAddCpf() {
    setIsLoading(true);

    const user = JSON.parse(sessionStorage.getItem("user") || "null");
    const credentials = JSON.parse(
      sessionStorage.getItem("pendingCredentials") || "null",
    );

    if (!user?.id) {
      navigate("/auth/register/phone");
      setIsLoading(false);
      return;
    }

    try {
      await putUser(user.id, {
        name: user.name,
        email: user.email,
        role: user.role || "customer",
        password: credentials?.password || "",
        cpf,
      });
    } catch {
      // A requisição foi feita.
      // O servidor pode retornar 500, porém navegamos normalmente.
    } finally {
      navigate("/auth/register/phone");
      setIsLoading(false);
    }
  }

  const handleContinue = () => {
    fetchAddCpf();
  };

  const handleSkip = () => {
    sessionStorage.removeItem("pendingCredentials");
    sessionStorage.setItem("showAddress", JSON.stringify(false));
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Parabéns! Sua conta foi criada</Heading>
        <p className="text-typography-base text-sm text-center">
          Finalize seu cadastro adicionando mais informações.
        </p>
        <Input
          type="text"
          name="cpf"
          id="cpf"
          label="CPF"
          placeholder="Digite seu CPF"
          onChange={handleCpfChange}
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

export default RegisterCpf;
