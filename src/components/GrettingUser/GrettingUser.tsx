import "./GrettingUser.css";

interface GrettingUserProps {
  userName: string;
}

export const GrettingUser = ({ userName }: GrettingUserProps) => {
  return (
    <div className="greeting-user">
      <p>Olá, {userName}</p>
      <a href="">Ver meus pontos</a>
    </div>
  );
};
