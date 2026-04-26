import { useLocation, useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../components";
import { useEffect, useState } from "react";
import type { CepAddress } from "../../api/getCepAddress";
import type { FormLayoutContext } from "../../components/Layouts/FormLayout/FormLayout";

function Address() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTitle, setNavigationHistory } =
    useOutletContext<FormLayoutContext>();

  useEffect(() => {
    setTitle("Endereço");
    setNavigationHistory("/register/cep");
  }, [setTitle, setNavigationHistory]);

  const address = (location.state?.address as CepAddress) || {
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
    complemento: "",
  };

  const [number, setNumber] = useState("");

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleFinish = () => {
    const fullAddress = {
      cep: address.cep,
      logradouro: address.logradouro,
      bairro: address.bairro,
      localidade: address.localidade,
      uf: address.uf,
      number: number,
    };
    sessionStorage.setItem("address", JSON.stringify(fullAddress));
    navigate("/");
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
          value={address.cep}
          fullWidth
          noLabel
          disabled
        />
        <Input
          type="text"
          name="logradouro"
          id="logradouro"
          label="Logradouro"
          placeholder="Logradouro"
          value={address.logradouro}
          fullWidth
          noLabel
          disabled
        />
        <Input
          type="text"
          name="bairro"
          id="bairro"
          label="Bairro"
          placeholder="Bairro"
          value={address.bairro}
          fullWidth
          noLabel
          disabled
        />
        <Input
          type="text"
          name="localidade"
          id="localidade"
          label="Cidade"
          placeholder="Cidade"
          value={address.localidade}
          fullWidth
          noLabel
          disabled
        />
        <Input
          type="text"
          name="uf"
          id="uf"
          label="UF"
          placeholder="UF"
          value={address.uf}
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
          value={number}
          onChange={handleNumberChange}
          fullWidth
          noLabel
        />
        <Button variant="primary" onClick={handleFinish} fullWidth>
          Concluir
        </Button>
      </div>
    </section>
  );
}

export default Address;
