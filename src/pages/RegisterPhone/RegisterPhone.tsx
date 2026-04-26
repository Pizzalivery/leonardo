import { useState } from "react";
import { useNavigate, Link } from "react-router";

function RegisterPhone() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!phone) return alert("Por favor, insira um número de telefone.");

    setIsLoading(true);
    try {
      const token = JSON.parse(sessionStorage.getItem("userToken") || "");
      const response = await fetch("https://burgerlivery-esposito-api.onrender.com/auth/update-phone", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ phone }),
      });

      if (response.ok) {
        // Redireciona para a próxima página em caso de sucesso
        navigate("/auth/cep"); 
      } else {
        throw new Error("Erro na requisição");
      }
    } catch (err) {
      console.error("Erro ao salvar telefone:", err);
      alert("Erro ao salvar telefone. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Redireciona para Home passando o estado para ocultar o endereço
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
        {/* Seta de Voltar */}
        <Link to="/auth/login" className="absolute top-10 left-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#1D2129" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Header Content */}
        <div className="flex flex-col gap-6 mt-16 text-center">
          <h1 className="text-[32px] font-bold text-[#1D2129] leading-tight">
            Adicione seu telefone
          </h1>
          <p className="text-sm text-[#4E5D66] px-2">
            Adicione seu telefone para um canal de contato mais agilidade e praticidade.
          </p>
        </div>

        {/* Input Field */}
        <div className="flex flex-col gap-4">
          <input
            type="tel"
            placeholder="DDD + Número *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-14 w-full rounded-full border border-gray-200 bg-[#F7F8FA] px-6 text-black focus:border-[#F25D27] outline-none transition-all"
          />

          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="h-14 w-full rounded-full bg-[#F25D27] text-white font-bold text-lg shadow-md active:scale-95 transition-all disabled:bg-gray-300"
          >
            {isLoading ? "Salvando..." : "Continuar"}
          </button>

          <button
            onClick={handleSkip}
            className="h-14 w-full rounded-full bg-transparent text-[#1D2129] font-bold text-lg hover:bg-gray-50 transition-all"
          >
            Pular
          </button>
        </div>
      </main>
    </div>
  );
}

export default RegisterPhone;