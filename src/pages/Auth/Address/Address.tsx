import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button, Heading, Input } from "../../../components";
import postAuthRegister, { type RegisterPayload } from "../../../api/postAuthRegister";
import { LoaderCircle } from "lucide-react";

function Address() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumber(value);
  };

  async function fetchRegister(payload: RegisterPayload) {
    setIsLoading(true);

    try {
      const response = await postAuthRegister(payload);
      sessionStorage.setItem("userToken", JSON.stringify(response.accessToken));
      sessionStorage.setItem("user", JSON.stringify(response.user));
      sessionStorage.removeItem("registerData");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 400) {
          alert("Dados inválidos. Verifique os campos e tente novamente.");
        }
        if (parsedError.statusCode === 409) {
          alert("Este e-mail já está cadastrado.");
        }
        if (parsedError.statusCode === 500) {
          alert("Erro no servidor. Tente novamente mais tarde.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleConclude = () => {
    const registerData = JSON.parse(sessionStorage.getItem("registerData") ?? "{}");

    const payload: RegisterPayload = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      cpf: registerData.cpf ?? "",
      phone: registerData.phone ?? "",
      role: "customer",
      address: {
        cep: state.cep,
        state: state.state,
        city: state.city,
        neighborhood: state.neighborhood,
        street: state.street,
        number,
      },
    };

    fetchRegister(payload);
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Endereço</Heading>
        <Input
          type="text"
          name="cep"
          id="cep"
          label="CEP"
          placeholder="CEP"
          value={state.cep}
          onChange={() => {}}
          fullWidth
          noLabel
          disabled
        />
        <Input
          type="text"
          name="street"
          id="street"
          label="Rua"
          placeholder="Rua"
          value={state.street}
          onChange={() => {}}
          fullWidth
          noLabel
          disabled
        />
        <Input
          type="text"
          name="neighborhood"
          id="neighborhood"
          label="Bairro"
          placeholder="Bairro"
          value={state.neighborhood}
          onChange={() => {}}
          fullWidth
          noLabel
          disabled
        />
        <Input
          type="text"
          name="city"
          id="city"
          label="Cidade"
          placeholder="Cidade"
          value={state.city}
          onChange={() => {}}
          fullWidth
          noLabel
          disabled
        />
        <Input
          type="text"
          name="state"
          id="state"
          label="Estado"
          placeholder="Estado"
          value={state.state}
          onChange={() => {}}
          fullWidth
          noLabel
          disabled
        />
        <Input
          type="text"
          name="number"
          id="number"
          label="Número"
          placeholder="Número"
          onChange={handleNumberChange}
          fullWidth
          noLabel
          disabled={isLoading}
        />
        <Button
          variant="primary"
          onClick={handleConclude}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Concluir"}
        </Button>
      </div>
    </section>
  );
}

export default Address;