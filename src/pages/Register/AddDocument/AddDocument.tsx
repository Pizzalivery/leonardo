import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useEffect, useState } from "react";
import putUpdateAccount from "../../../api/putUpdateAccount";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import type { UpdateAccount } from "../../../types";

function AddDocument() {
  const navigate = useNavigate();

  const { setTitle } = useOutletContext<AuthLayoutContext>();

  const [user, setUser] = useState<UpdateAccount | null>(null);
  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUpdateAccount(payload: UpdateAccount) {
    setIsLoading(true);

    try {
      const response = await putUpdateAccount(payload);
      if (response) {
        navigate("/register/phone");
      }
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 401) {
          alert("Email ou senha incorretos. Por favor, tente novamente.");
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

  const handleChangeDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };

  const handleUpdateAccount = () => {
    const payload = {
      id: user?.id || "",
      cpf: cpf,
    };
    fetchUpdateAccount(payload);
  };

  const handleSkip = () => {
    navigate("/");
  };

  useEffect(() => {
    setTitle("");
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <Heading component="h1">Parabéns! Sua conta foi criada</Heading>

          <p className="text-center text-typography-base text-base">
            Finalize seu cadastro adicionando mais informações.
          </p>
        </div>
        <Input
          type="text"
          name="cpf"
          id="cpf"
          label="CPF"
          placeholder="Digite seu CPF"
          onChange={handleChangeDocument}
          fullWidth
          noLabel
          disabled={isLoading}
        />

        <Button
          variant="primary"
          onClick={handleUpdateAccount}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
        </Button>
        <Button onClick={handleSkip} fullWidth disabled={isLoading}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default AddDocument;
