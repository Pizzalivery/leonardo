import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

export type AddressInfo = {
  cep: string;
  street: string;
  city: string;
  state: string;
  neighborhood: string;
};

function AddCep() {
  const navigate = useNavigate();
  const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle("Criar conta - CEP");
    setNavigationHistory("");
  }, [setTitle, setNavigationHistory]);

  const getAddressFromCep = async () => {
    setLoading(true);
    try {
      const formattedCep = zipCode.replace(/\D/g, "");
      const request = await fetch(`https://brasilapi.com.br/api/cep/v2/${formattedCep}`);
      if (!request.ok) {
        alert("CEP não encontrado.");
        return;
      }
      const result: AddressInfo = await request.json();
      navigate("/register/address", { state: { addressData: result } });
    } catch {
      alert("Erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Heading component="h1">Qual seu endereço</Heading>
        <p className="text-typography-base text-base text-center">
          Informe seu CEP para adicionar seu endereço.
        </p>
        <Input type="text" name="cep" id="cep" label="CEP" placeholder="Digite seu CEP"
          onChange={(e) => setZipCode(e.target.value)} fullWidth noLabel disabled={loading} />
        <Button variant="primary" onClick={getAddressFromCep} fullWidth disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Buscar endereço"}
        </Button>
        <Button onClick={() => navigate("/")} disabled={loading}>Pular</Button>
      </div>
    </section>
  );
}

export default AddCep;
