import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterAddress() {
  const navigate = useNavigate();
  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Busca o CEP na Brasil API (ou ViaCEP)
  const handleSearchAddress = async () => {
    if (cep.replace(/\D/g, "").length !== 8) {
      return alert("Por favor, insira um CEP válido com 8 dígitos.");
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
      const data = await response.json();

      if (response.ok) {
        // Redireciona para a próxima página enviando os dados do endereço
        navigate("/auth/address-details", { state: { address: data } });
      } else {
        throw new Error("CEP não encontrado");
      }
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar o CEP. Verifique o número e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Redireciona para Home passando o estado para ocultar o componente de endereço
    navigate("/home", { state: { hideAddress: true } });
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
        {/* Seta de Voltar (para a tela de Telefone) */}
        <Link to="/auth/phone" className="absolute top-10 left-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#1D2129" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Conteúdo Header */}
        <div className="flex flex-col gap-4 mt-16 text-center">
          <h1 className="text-[32px] font-bold text-[#1A1F26] leading-tight">
            Qual seu endereço
          </h1>
          <p className="text-sm text-[#6C757D] px-6">
            Informe seu CEP para adicionar seu endereço.
          </p>
        </div>

        {/* Input e Botões */}
        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Digite seu CEP *"
            value={cep}
            maxLength={9}
            onChange={(e) => setCep(e.target.value)}
            className="h-14 w-full rounded-2xl border border-gray-200 bg-[#F8F9FA] px-6 text-black focus:border-[#F25D27] outline-none transition-all placeholder:text-[#ADB5BD]"
          />

          <button
            onClick={handleSearchAddress}
            disabled={isLoading}
            className="h-14 w-full rounded-full bg-[#F25D27] text-white font-bold text-lg shadow-md active:scale-95 transition-all disabled:bg-gray-400"
          >
            {isLoading ? "Buscando..." : "Buscar endereço"}
          </button>

          <button
            onClick={handleSkip}
            className="h-14 w-full rounded-full bg-[#E9ECEF] text-[#4E5D66] font-bold text-lg hover:bg-gray-200 transition-all"
          >
            Pular
          </button>
        </div>
      </main>
    </div>
  );
}

export default RegisterAddress;