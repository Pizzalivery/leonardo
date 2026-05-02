import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { useEffect, useState } from "react";
import putUpdateAccount from "../../../api/putUpdateAccount";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import type { UpdateAccount } from "../../../types";

function AddPhoneNumber() {
  const navigate = useNavigate();

  const { setTitle } = useOutletContext<AuthLayoutContext>();

  const [user, setUser] = useState<UpdateAccount | null>(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUpdateAccount(payload: UpdateAccount) {
    setIsLoading(true);

    try {
      const response = await putUpdateAccount(payload);
      if (response) {
        navigate("/register/search-address");
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

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleUpdateAccount = () => {
    const payload = {
      id: user?.id || "",
      phone: phone,
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
          <Heading component="h1">Adicione seu telefone</Heading>

          <p className="text-center text-typography-base text-base">
            Adicione seu telefone para um canal de contato mais agilidade e
            praticidade.
          </p>
        </div>
        <Input
          type="text"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="DDD + número"
          onChange={handleChangePhone}
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

export default AddPhoneNumber;
