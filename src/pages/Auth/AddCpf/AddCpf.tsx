import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Heading, Input } from "../../../components";

function AddCpf() {
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCpf(value);
  };

  const handleContinue = () => {
    const registerData = JSON.parse(sessionStorage.getItem("registerData") ?? "{}");
    sessionStorage.setItem("registerData", JSON.stringify({ ...registerData, cpf }));
    navigate("/register/phone");
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Adicionar CPF</Heading>
        <Input
          type="text"
          name="cpf"
          id="cpf"
          label="CPF"
          placeholder="Seu CPF"
          onChange={handleCpfChange}
          fullWidth
          noLabel
        />
        <Button
          variant="primary"
          onClick={handleContinue}
          fullWidth
        >
          Continuar
        </Button>
        <Button
          variant="secondary"
          onClick={handleSkip}
          fullWidth
        >
          Pular
        </Button>
      </div>
    </section>
  );
}

export default AddCpf;