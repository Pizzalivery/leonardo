import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { LoaderCircle } from "lucide-react";

import { Button, Heading, Input } from "../../../components";
import patchUserCpf from "../../../api/patchUserCpf";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type StoredUser = {
  id?: string | number;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  address?: string;
};

function RegisterCpf() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/register");
  }, [setNavigationHistory, setTitle]);

  function handleCpfChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCpf(event.target.value);
  }

  function getStoredUser(): StoredUser | null {
    return JSON.parse(sessionStorage.getItem("user") || "null");
  }

  function formatCpf(value: string) {
    return value.replace(/\D/g, "");
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

  async function handleContinue() {
    const storedUser = getStoredUser();
    const userId = storedUser?.id;
    const sanitizedCpf = formatCpf(cpf);

    if (!sanitizedCpf) {
      alert("Digite seu CPF.");
      return;
    }

    if (sanitizedCpf.length !== 11) {
      alert("Digite um CPF válido com 11 números.");
      return;
    }

    if (!userId) {
      alert("Não foi possível identificar o usuário cadastrado.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await patchUserCpf(userId, {
        cpf: sanitizedCpf,
      });

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          ...(response?.user || response),
          cpf: sanitizedCpf,
        }),
      );

      navigate("/auth/register/phone");
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);

          if (parsedError.statusCode === 400) {
            alert(parsedError.message || "Não foi possível salvar o CPF.");
            return;
          }

          if (parsedError.statusCode === 401) {
            alert("Sessão inválida. Faça login novamente.");
            return;
          }

          if (parsedError.statusCode === 500) {
            alert(
              "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
            );
            return;
          }
        } catch {
          alert("Não foi possível salvar o CPF.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 min-h-[calc(100vh-88px)]">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading component="h1">Parabéns! Sua conta foi criada</Heading>
          <p className="max-w-[280px] text-sm text-typography-base">
            Finalize seu cadastro adicionando mais informações.
          </p>
        </div>

        <Input
          type="text"
          name="cpf"
          id="cpf"
          label="CPF"
          placeholder="Digite seu CPF *"
          value={cpf}
          onChange={handleCpfChange}
          fullWidth
          noLabel
          disabled={isLoading}
          maxLength={14}
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

        <Button onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterCpf;