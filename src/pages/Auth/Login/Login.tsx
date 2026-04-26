import { useState } from "react";
import { useNavigate, Link } from "react-router"; 
import postAuthLogin from "../../../api/postAuthLogin"; 

function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await postAuthLogin({ email: identifier, password });
      if (response.accessToken) {
        sessionStorage.setItem("userToken", JSON.stringify(response.accessToken));
        sessionStorage.setItem("user", JSON.stringify(response.user ?? response));
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      alert("Erro ao entrar. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7F8FA] p-4">
      {/* O container precisa ser 'relative' para a seta 'absolute' funcionar */}
      <main
        className="relative flex w-full max-w-[358px] flex-col px-8 py-10 bg-white shadow-xl rounded-[32px]"
        style={{ minHeight: "660px" }}
      >
        {/* ESTA É A SETA QUE VOCÊ PRECISA */}
        <Link 
          to="/auth/cpf" 
          className="absolute top-10 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#1D2129" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        <h2 className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
          Pizzalivery
        </h2>

        <h1 className="mt-16 text-center text-[32px] font-bold text-[#1D2129] leading-tight">
          Seja bem vindo
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
          <input
            type="text"
            placeholder="e-mail ou nome de usuário"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="h-14 w-full rounded-full border border-gray-200 bg-[#F7F8FA] px-6 text-black focus:border-[#F25D27] outline-none"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-14 w-full rounded-full border border-gray-200 bg-[#F7F8FA] px-6 text-black focus:border-[#F25D27] outline-none"
          />

          <Link to="/auth/forgot" className="self-end text-xs font-semibold text-[#F25D27]">
            Esqueci minha senha
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 h-14 w-full rounded-full bg-[#F25D27] text-white font-bold text-lg shadow-md hover:opacity-90 disabled:bg-gray-300"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-auto text-center text-sm text-gray-500">
          Não tem uma conta?{" "}
          <Link to="/auth/register" className="font-bold text-[#F25D27]">
            Criar conta
          </Link>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;