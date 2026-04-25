import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Heading, Input } from "../../../components";

function AddPhone() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
  };

  const handleContinue = () => {
    const registerData = JSON.parse(sessionStorage.getItem("registerData") ?? "{}");
    sessionStorage.setItem("registerData", JSON.stringify({ ...registerData, phone }));
    navigate("/register/cep");
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Adicionar Telefone</Heading>
        <Input
          type="text"
          name="phone"
          id="phone"
          label="Telefone"
          placeholder="Seu telefone"
          onChange={handlePhoneChange}
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

export default AddPhone;