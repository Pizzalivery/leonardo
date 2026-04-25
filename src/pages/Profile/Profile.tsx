import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { IconButton } from "../../components";
import { ChevronLeft } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <header className="grid grid-cols-[1fr_auto_1fr] mx-auto px-5 w-full gap-4 my-6">
        <span>
          <IconButton label="Voltar" onClick={handleBack}>
            <ChevronLeft />
          </IconButton>
        </span>

        <h1 className="text-center text-lg font-bold">Perfil</h1>
        <span></span>
      </header>

      <main className="mx-auto px-5 flex flex-col gap-6">

        <div className="flex flex-col items-center gap-2 py-4">
          <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center text-white text-2xl font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
            </div>
          <p className="font-bold text-typography-darkest text-lg">
            {user?.name || "Usuário"}</p>
          <p className="text-typography-base text-sm">
            {user?.email || ""}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-typography-darkest">Detalhes da conta</p>

          <div className="flex flex-col divide-y divide-interface-border">
            {[
              "Dados da Conta",
              "Endereço",
              "Pagamento",
              "Programa de pontos",
              "Alterar senha",
            ].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center py-4"
              >
                <span className="text-typography-base">{item}</span>
                <ChevronRight className="text-typography-light" size={18} />
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  );
}

export default Profile;