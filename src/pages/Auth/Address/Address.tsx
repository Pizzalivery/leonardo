import { useState, useEffect } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

type AddressState = {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
};

function Address() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

  const addressData = location.state as AddressState;

  const [numero, setNumero] = useState("");

  useEffect(() => {
    setTitle("Endereço");
    setNavigationHistory("/auth/search-cep");
  }, []);

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumero(value);
  };

  const handleConcluir = () => {
    const enderecoCompleto = `${addressData.logradouro}, ${numero}`;
    sessionStorage.setItem("hasAddress", "true");
    sessionStorage.setItem("address", enderecoCompleto);
    navigate("/");
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Confirme seu endereço</Heading>
        <Input
          type="text"
          name="cep"
          id="cep"
          label="CEP"
          placeholder="CEP"
          value={addressData?.cep || ""}
          fullWidth
          noLabel
          disabled
          onChange={() => {}}
        />
        <Input
          type="text"
          name="logradouro"
          id="logradouro"
          label="Rua"
          placeholder="Rua"
          value={addressData?.logradouro || ""}
          fullWidth
          noLabel
          disabled
          onChange={() => {}}
        />
        <Input
          type="text"
          name="bairro"
          id="bairro"
          label="Bairro"
          placeholder="Bairro"
          value={addressData?.bairro || ""}
          fullWidth
          noLabel
          disabled
          onChange={() => {}}
        />
        <Input
          type="text"
          name="cidade"
          id="cidade"
          label="Cidade"
          placeholder="Cidade"
          value={addressData?.cidade || ""}
          fullWidth
          noLabel
          disabled
          onChange={() => {}}
        />
        <Input
          type="text"
          name="estado"
          id="estado"
          label="Estado"
          placeholder="Estado"
          value={addressData?.estado || ""}
          fullWidth
          noLabel
          disabled
          onChange={() => {}}
        />
        <Input
          type="text"
          name="numero"
          id="numero"
          label="Número"
          placeholder="Número"
          onChange={handleNumeroChange}
          fullWidth
          noLabel
        />
        <Button
          variant="primary"
          onClick={handleConcluir}
          fullWidth
        >
          Concluir
        </Button>
      </div>
    </section>
  );
}

export default Address;
