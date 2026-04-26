import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface AddressData {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

function AddressDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Estados para os campos do formulário
  const [address, setAddress] = useState<AddressData>({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    cep: ""
  });

  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  // Preenche os campos automaticamente com os dados vindos da busca de CEP
  useEffect(() => {
    const stateAddress = location.state?.address;
    if (stateAddress) {
      setAddress({
        street: stateAddress.street || stateAddress.logradouro || "",
        neighborhood: stateAddress.neighborhood || stateAddress.bairro || "",
        city: stateAddress.city || stateAddress.localidade || "",
        state: stateAddress.state || stateAddress.uf || "",
        cep: stateAddress.cep || ""
      });
    }
  }, [location]);

  const handleFinish = async () => {
    if (!number) return alert("Por favor, insira o número do endereço.");

    setIsLoading(true);
    try {
      // Simulação de salvamento ou chamada de API
      console.log("Salvando endereço completo:", { ...address, number, complement });
      
      // Sucesso: Redireciona para Home
      navigate("/home");
    } catch (err) {
      console.error("Erro ao salvar endereço:", err);
      alert("Erro ao salvar os dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#F7F8FA]">
      <main
        className="relative flex flex-col bg-white shadow-xl rounded-[32px] px-8 pt-10 pb-8 border border-gray-100"
        style={{
          width: "358px",
          height: "660px",
          marginTop: "88px",
          marginLeft: "16px",
          gap: "24px",
          opacity: 1,
        }}
      >
        {/* Seta de Voltar */}
        <Link to="/auth/cep" className="w-6 h-6 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#1D2129" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-2 mt-4">
          <h1 className="text-[32px] font-bold text-[#1A1F26] leading-tight">
            Estamos quase lá
          </h1>
          <p className="text-sm text-[#6C757D] leading-relaxed">
            Confira o endereço e adicione o número, se tiver complemento adicione também.
          </p>
          <p className="text-sm font-bold text-[#6C757D] mt-2">
            CEP: <span className="text-[#F25D27]">{address.cep}</span>
          </p>
        </div>

        {/* Formulário */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Rua (Read-only para conferência) */}
          <input
            type="text"
            value={address.street}
            readOnly
            className="h-14 w-full rounded-2xl border border-gray-100 bg-[#F8F9FA] px-6 text-[#1D2129] font-medium outline-none"
          />

          <div className="flex gap-3">
            {/* Número */}
            <input
              type="text"
              placeholder="Número *"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="h-14 w-[130px] rounded-2xl border border-gray-200 bg-[#F8F9FA] px-6 text-black focus:border-[#F25D27] outline-none transition-all"
            />
            {/* Complemento */}
            <input
              type="text"
              placeholder="Complemento"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              className="h-14 flex-1 rounded-2xl border border-gray-200 bg-[#F8F9FA] px-6 text-black focus:border-[#F25D27] outline-none transition-all"
            />
          </div>

          {/* Bairro */}
          <input
            type="text"
            value={address.neighborhood}
            readOnly
            className="h-14 w-full rounded-2xl border border-gray-100 bg-[#F8F9FA] px-6 text-[#1D2129] font-medium outline-none"
          />

          <div className="flex gap-3">
            {/* Cidade */}
            <input
              type="text"
              value={address.city}
              readOnly
              className="h-14 flex-1 rounded-2xl border border-gray-100 bg-[#F8F9FA] px-6 text-[#1D2129] font-medium outline-none"
            />
            {/* UF */}
            <input
              type="text"
              value={address.state}
              readOnly
              className="h-14 w-[70px] text-center rounded-2xl border border-gray-100 bg-[#F8F9FA] px-2 text-[#1D2129] font-medium outline-none"
            />
          </div>
        </div>

        {/* Botão Concluir */}
        <div className="mt-auto">
          <button
            onClick={handleFinish}
            disabled={isLoading}
            className="h-14 w-full rounded-full bg-[#F25D27] text-white font-bold text-lg shadow-md active:scale-95 transition-all disabled:bg-gray-400"
          >
            {isLoading ? "Salvando..." : "Concluir"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default AddressDetails;