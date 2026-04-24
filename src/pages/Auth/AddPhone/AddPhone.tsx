import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import postAuthPhone from "../../../api/postAuthPhone";

function AddPhone() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const [phone, setPhone] = useState("");

  useEffect(() => {
    setTitle("Adicionar telefone");
    setNavigationHistory("/auth/add-cpf");
  }, [setTitle, setNavigationHistory]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleContinue = async () => {
    try {
      const token = sessionStorage.getItem("token") || "";

      await postAuthPhone(
        { phone },
        token
      );

      navigate("/auth/search-cep");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar telefone");
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 text-center">
          <Heading component="h1">Adicione seu telefone</Heading>
          <p className="text-typography-base text-sm">
            Adicione seu telefone para um canal de contato mais agilidade e praticidade.
          </p>
        </div>

        <Input
          type="tel"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="DDD + Número *"
          onChange={handlePhoneChange}
          fullWidth
          noLabel
        />

        <Button variant="primary" onClick={handleContinue} fullWidth>
          Continuar
        </Button>

        <button
          onClick={handleSkip}
          className="text-typography-base font-black text-base cursor-pointer"
        >
          Pular
        </button>
      </div>
    </section>
  );
}

export default AddPhone;