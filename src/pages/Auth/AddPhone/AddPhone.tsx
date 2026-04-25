import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import savePhone, { type PhoneUpdateRequest } from "../../../api/patchUserPhone";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddPhone() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle("Criar conta - Telefone");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const isTokenValid = () => {
    const token = sessionStorage.getItem("userToken");
    return token && token !== '"undefined"' && token !== "undefined" && token !== "null";
  };

  const persistPhone = async (body: PhoneUpdateRequest) => {
    setSubmitting(true);
    try {
      await savePhone(body);
      navigate("/register/cep");
    } catch {
      alert("Erro ao salvar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (!isTokenValid()) {
      navigate("/register/cep");
      return;
    }
    persistPhone({ phone });
  };

  return (
    <section className="grid place-items-center min-h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-4 w-full max-w-sm items-center text-center">
        <Heading component="h1">Adicione seu telefone</Heading>
        <span className="text-typography-base text-base">
          Adicione seu telefone para um canal de contato mais agilidade e praticidade.
        </span>
        <Input type="tel" name="phone" id="phone" label="Telefone" placeholder="DDD + Número *"
          onChange={(e) => setPhone(e.target.value)} fullWidth noLabel disabled={submitting} />
        <Button variant="primary" onClick={handleSubmit} fullWidth disabled={submitting}>
          {submitting ? <LoaderCircle className="animate-spin" /> : "Continuar"}
        </Button>
        <Button onClick={() => navigate("/")} disabled={submitting}>Pular</Button>
      </div>
    </section>
  );
}

export default AddPhone;
