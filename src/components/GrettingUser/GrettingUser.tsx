import "./GrettingUser.css";

interface GrettingUserProps {
  userName: string | null;
}

export const GrettingUser = ({ userName }: GrettingUserProps) => {
  const displayName = userName ? userName.split(" ")[0] : "Usuário";
  return (
    <div className="greeting-user">
      <p>Olá, {displayName}</p>
      <a href="">Ver meus pontos</a>
    </div>
  );
};
