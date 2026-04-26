import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import type { AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import type { CepAddressData } from "../SearchCep/SearchCep";

function AddAddress() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTitle, setNavigationHistory } =
    useOutletContext<AuthLayoutContext>();

  const addressData: CepAddressData = location.state?.addressData ?? {
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
  };

  const [number, setNumber] = useState("");
  
  const [complement, setComplement] = useState("");

  

  useEffect(() => {
   
    setTitle("Pizzalivery");
    setNavigationHistory("/auth/search-cep");
  }, [setTitle, setNavigationHistory]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleComplementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplement(e.target.value);
  };

  const handleFinish = () => {
    if (!number.trim()) {
      alert("Por favor, informe o número do endereço.");
      return;
    }

    const addressParts = [
      addressData.logradouro,
      number,
      complement || null,
      addressData.bairro,
      `${addressData.localidade} - ${addressData.uf}`,
    ].filter(Boolean);

    const fullAddress = addressParts.join(", ");

    const existingUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    const updatedUser = {
      ...existingUser,
      address: fullAddress,
      cep: addressData.cep,
    };
    sessionStorage.setItem("user", JSON.stringify(updatedUser));

    navigate("/");
  };

  const formattedCep = addressData.cep
    ? addressData.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2")
    : "";

  return (
    <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-4 items-center justify-center w-full max-w-sm mx-auto sm:max-w-md">
        <div className="text-center w-full">
          <Heading component="h1">Estamos quase lá</Heading>
          <p className="text-typography-base text-sm -mt-4">
            Confira o endereço e adicione o número, se tiver complemento
            adicione também.
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
          name="street"
          id="street"
          label="Rua"
          placeholder="Rua"
          value={addressData.logradouro}
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
              placeholder="Número*"
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
          name="neighborhood"
          id="neighborhood"
          label="Bairro"
          placeholder="Bairro"
          value={addressData.bairro}
          fullWidth
          noLabel
          disabled
        />

        <div className="flex gap-3 w-full">
          <div className="flex-1">
            <Input
              type="text"
              name="city"
              id="city"
              label="Cidade"
              placeholder="Cidade"
              value={addressData.localidade}
              fullWidth
              noLabel
              disabled
            />
          </div>
          <div className="w-1/5">
            <Input
              type="text"
              name="state"
              id="state"
              label="Estado"
              placeholder="UF"
              value={addressData.uf}
              fullWidth
              noLabel
              disabled
            />
          </div>
        </div>

        <Button variant="primary" onClick={handleFinish} fullWidth>
          Concluir
        </Button>
      </div>
    </section>
  );
}

export default AddAddress;
