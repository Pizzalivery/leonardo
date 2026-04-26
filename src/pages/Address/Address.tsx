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
    setTitle("Pizzalivery");
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
  const [complement, setComplement] = useState("");

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleComplementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComplement(value);
  };

  const handleFinish = () => {
    const addressData = {
      cep: address.cep,
      logradouro: address.logradouro,
      bairro: address.bairro,
      localidade: address.localidade,
      uf: address.uf,
      number: number,
    };
    sessionStorage.setItem("address", JSON.stringify(addressData));
    navigate("/");
  };

  const formattedCep = address.cep
    ? address.cep.replace(/\D/g, "").replace(/^(\d{5})(\d{3})$/, "$1-$2")
    : "";

  return (
    <section className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-88px)]">
      <div className="text-center">
        <Heading component="h1">Estamos quase lá</Heading>
        <p className="text-typography-base text-sm mt-2">
          Confira o endereço e adicione o número, se tiver complemento adicione
          também.
        </p>
      </div>
      {formattedCep && (
        <p className="w-full text-sm text-typography-dark font-normal">
          CEP:{" "}
          <span className="text-brand-primary font-semibold">
            {formattedCep}
          </span>
        </p>
      )}
      <Input
        type="text"
        name="logradouro"
        id="logradouro"
        label="Rua"
        placeholder="Rua"
        value={address.logradouro}
        fullWidth
        noLabel
        disabled
      />
      <div className="flex gap-3 w-full">
        <div className="w-2/5">
          <Input
            type="text"
            name="number"
            id="number"
            label="Número"
            placeholder="Número *"
            value={number}
            onChange={handleNumberChange}
            fullWidth
            noLabel
          />
        </div>
        <div className="flex-1">
          <Input
            type="text"
            name="complement"
            id="complement"
            label="Complemento"
            placeholder="Complemento"
            value={complement}
            onChange={handleComplementChange}
            fullWidth
            noLabel
          />
        </div>
      </div>
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
      <div className="flex gap-3 w-full">
        <div className="flex-1">
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
        </div>
        <div className="w-1/4">
          <Input
            type="text"
            name="uf"
            id="uf"
            label="Estado"
            placeholder="UF"
            value={address.uf}
            fullWidth
            noLabel
            disabled
          />
        </div>
      </div>
      <Button variant="primary" onClick={handleFinish} fullWidth>
        Concluir
      </Button>
    </section>
  );
}

export default Address;
