import { useEffect } from "react";
import { useOutletContext } from "react-router";

function Profile() {
  // Esta linha resolve o erro "not defined" do console
  const outletContext = useOutletContext<any>();

  useEffect(() => {
    if (outletContext?.setTitle) {
      outletContext.setTitle("Perfil");
    }
  }, [outletContext]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Página de Perfil</h1>
      <p>Seja bem-vindo!</p>
    </div>
  );
}

export default Profile;