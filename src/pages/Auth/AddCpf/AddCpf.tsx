import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import updateUserCpf, { type CpfUpdateRequest } from "../../../api/patchUserCpf";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddCpf() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle("Criar conta - CPF");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const submitCpf = async (data: CpfUpdateRequest) => {
    setLoading(true);
    try {
      await updateUserCpf(data);
      navigate("/register/phone");
    } catch {
      alert("Erro ao salvar CPF. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    const token = sessionStorage.getItem("userToken");
    const isValidToken = token && token !== '"undefined"' && token !== "undefined" && token !== "null";

    if (!isValidToken) {
      navigate("/register/phone");
      return;
    }

    submitCpf({ cpf });
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-7 items-center justify-center text-center">
        <Heading component="h1">Parabéns! Sua conta foi criada</Heading>
        <p className="text-typography-base text-base text-center">
          Finalize seu cadastro adicionando mais informações.
        </p>
        <Input type="text" name="cpf" id="cpf" label="CPF" placeholder="Digite seu CPF *"
          onChange={(e) => setCpf(e.target.value)} fullWidth noLabel disabled={loading} />
        <Button variant="primary" onClick={handleContinue} fullWidth disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
        </Button>
        <Button variant="default" onClick={() => navigate("/")} fullWidth disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Pular"}
        </Button>
      </div>
    </section>
  );
}

export default AddCpf;
