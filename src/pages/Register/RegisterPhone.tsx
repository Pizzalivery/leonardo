import { useEffect, useState, useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../components";
import savePhone from "../../api/patchUserPhone";
import type { PhoneUpdateRequest } from "../../api/patchUserPhone";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../components/Layouts/AuthLayout/AuthLayout";

function RegisterPhone() {
  const navigate = useNavigate();
  const { setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const [formState, setFormState] = useState({
    phoneValue: "",
    submitting: false,
  });

  useEffect(() => {
    setNavigationHistory("");
  }, [setNavigationHistory]);

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      phoneValue: e.target.value,
    }));
  };

  const isTokenValid = () => {
    const token = sessionStorage.getItem("userToken");
    return (
      token &&
      token !== '"undefined"' &&
      token !== "undefined" &&
      token !== "null"
    );
  };

  const goNext = useCallback(() => {
    navigate("/register/cep");
  }, [navigate]);

  const persistPhone = async (body: PhoneUpdateRequest) => {
    setFormState((prev) => ({ ...prev, submitting: true }));
    try {
      await savePhone(body);
      goNext();
    } catch {
      alert("Erro ao salvar. Tente novamente.");
    } finally {
      setFormState((prev) => ({ ...prev, submitting: false }));
    }
  };

  const handleSubmit = () => {
    if (!isTokenValid()) {
      goNext();
      return;
    }

    persistPhone({ phone: formState.phoneValue });
  };

  const skipStep = () => navigate("/");

  return (
    <section className="grid place-items-center min-h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-4 w-full max-w-sm items-center text-center">
        <Heading component="h1">Adicione seu telefone</Heading>

        <span className="text-typography-base text-base">
          Adicione seu telefone para um canal de contato mais agilidade e praticidade.
        </span>

        <Input
          type="tel"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="DDD + Número *"
          onChange={updateField}
          fullWidth
          noLabel
          disabled={formState.submitting}
        />

        <Button
          variant="primary"
          onClick={handleSubmit}
          fullWidth
          disabled={formState.submitting}
        >
          {formState.submitting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Continuar"
          )}
        </Button>

        <Button onClick={skipStep} disabled={formState.submitting}>
          Pular
        </Button>
      </div>
    </section>
  );
}

export default RegisterPhone;